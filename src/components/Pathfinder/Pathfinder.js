import React, { Component } from "react";
import NavigationMenu from "./../NavMenuWrapper/NavigationMenu/NavigationMenu";
import Grid from "./../Grid/Grid";
import ControlButtons from "./../ControlButtons/ControlButtons";
import PropTypes from "prop-types";
import {
	getPath,
	getShortestPath,
} from "../../utils/algorithms/pathfindingFuncs";
import { createMazeFunction } from "./../../utils/helpers/mazeCreator";
import RowSlider from "../RowSlider/RowSlider";
import ColSlider from "../ColSlider/ColSlider";
import "./Pathfinder.scss";

const maxRow = 60;
const maxCol = 60;
const minRow = 2;
const minCol = 2;

class Pathfinder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			heuristicSelection: "Manhattan",
			algorithm: 0,
			allowDiagonal: false,
			grid: [],
			row: 0,
			col: 0,
			resetOption: false,
			visitedCells: [],
			dontCutCorners: false,
			visitedCellsAnimation: [],
			shortestPathAnimation: [],
			mazeCreationAnimation: [],
		};
	}

	componentDidMount() {
		this.setState({ row: 30, col: 30 });
	}

	resetGrid = () => {
		this.cancelAnimations();
		const { row, col } = this.state;
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("cell-visited");
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("cell-shortestPath", "mazeTemp", "mazeFinal");
			}
		}
		this.setState({ resetOption: false });
	};

	clearWalls = () => {
		const { row, col } = this.state;
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("CurrentWall");
			}
		}
	};

	visualizeAlgorithm(visitedCells, grid) {
		const shortestPath = getShortestPath(grid);
		var visitedCellsAnimation = [];
		for (let i = 1; i <= visitedCells.length; i++) {
			if (i === visitedCells.length) {
				visitedCellsAnimation.push(
					setTimeout(() => {
						this.animateShortestPath(shortestPath);
					}, 10 * i)
				);
				this.setState({
					resetOption: true,
					visitedCellsAnimation: visitedCellsAnimation,
				});
				return;
			}
			const cell = visitedCells[i];
			if (
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.contains("FinishPoint") ||
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.contains("StartPoint")
			)
				continue;
			visitedCellsAnimation.push(
				setTimeout(() => {
					const cell = visitedCells[i];
					document
						.getElementById(`cell-${cell.row}-${cell.col}`)
						.classList.add("cell-visited");
				}, 10 * i)
			);
		}
	}

	animateShortestPath(shortestPath) {
		var shortestPathAnimation = [];
		for (let i = 0; i < shortestPath.length - 1; i++) {
			const cell = shortestPath[i];
			if (
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.contains("FinishPoint") ||
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.contains("StartPoint")
			)
				continue;
			shortestPathAnimation.push(
				setTimeout(() => {
					const cell = shortestPath[i];
					document
						.getElementById(`cell-${cell.row}-${cell.col}`)
						.classList.add("cell-shortestPath");
				}, 50 * i)
			);
		}
		this.setState({ shortestPathAnimation: shortestPathAnimation });
	}

	createGrid = (row, col) => {
		const grid = [];
		for (let i = 0; i < row; i++) {
			const gridRow = [];
			for (let j = 0; j < col; j++) {
				gridRow.push(this.createCellVal(i, j));
			}
			grid.push(gridRow);
		}
		return grid;
	};

	createCellVal = (row, col) => {
		return {
			row,
			col,
			currentWall: document
				.getElementById(`cell-${row}-${col}`)
				.classList.contains("CurrentWall"),
			startPoint: document
				.getElementById(`cell-${row}-${col}`)
				.classList.contains("StartPoint"),
			finishPoint: document
				.getElementById(`cell-${row}-${col}`)
				.classList.contains("FinishPoint"),
			distance: Infinity,
			parent: null,
			beenVisited: false,
			heuristicDistanceTotal: Infinity,
			heuristicDistance: Infinity,
			direction: [],
		};
	};

	computePath = () => {
		this.resetGrid();
		const grid = this.createGrid(this.state.row, this.state.col);
		console.log(grid);
		var visitedCells = getPath(
			grid,
			this.state.algorithm,
			this.state.heuristicSelection,
			this.state.allowDiagonal,
			this.state.dontCutCorners
		);
		this.setState({ visitedCells: visitedCells });
		this.visualizeAlgorithm(visitedCells, grid);
	};

	callBackFunction = (childSelection) => {
		this.setState({ heuristicSelection: childSelection });
	};

	resetPassback = () => {
		this.setState({
			heuristicSelection: "Manhattan",
			allowDiagonal: false,
			dontCutCorners: false,
		});
	};

	selectedAlgorithm = (algorithm) => {
		this.setState({ algorithm: algorithm });
	};

	setAllowDiagonal = (check) => {
		this.setState({ allowDiagonal: check });
	};

	setDontCutCorners = (check) => {
		this.setState({ dontCutCorners: check });
	};

	generateMaze = () => {
		this.resetGrid();
		this.clearWalls();
		const { row, col } = this.state;
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				document.getElementById(`cell-${i}-${j}`).classList.add("CurrentWall");
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("StartPoint", "FinishPoint");
			}
		}
		for (let i = 0; i < row; i += 2) {
			for (let j = 0; j < col; j += 2) {
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("CurrentWall");
			}
		}
		document.getElementById(`cell-0-0`).classList.add("StartPoint");

		document
			.getElementById(
				`cell-${Math.ceil(row / 2) * 2 - 2}-${Math.ceil(col / 2) * 2 - 2}`
			)
			.classList.add("FinishPoint");
		const createdMaze = createMazeFunction(
			Math.ceil(row / 2),
			Math.ceil(col / 2)
		);
		var mazeCreationAnimation = [];
		for (let i = 0; i < createdMaze.length; i++) {
			const currCell = createdMaze[i];
			if (currCell.beenConnected) {
				mazeCreationAnimation.push(
					setTimeout(() => {
						document
							.getElementById(`cell-${currCell.row}-${currCell.col}`)
							.classList.add("mazeFinal");
						document
							.getElementById(`cell-${currCell.row}-${currCell.col}`)
							.classList.remove("mazeTemp");
					}, 20 * i)
				);
			} else {
				mazeCreationAnimation.push(
					setTimeout(() => {
						document
							.getElementById(`cell-${currCell.row}-${currCell.col}`)
							.classList.add("mazeTemp");
						document
							.getElementById(`cell-${currCell.row}-${currCell.col}`)
							.classList.remove("CurrentWall");
					}, 20 * i)
				);
			}
		}
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				mazeCreationAnimation.push(
					setTimeout(() => {
						document
							.getElementById(`cell-${i}-${j}`)
							.classList.remove("mazeTemp", "mazeFinal");
					}, 20 * createdMaze.length)
				);
			}
		}
		this.setState({ mazeCreationAnimation: mazeCreationAnimation });
	};

	removeStartFinish = () => {
		const { row, col } = this.state;
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove(
						"StartPoint",
						"FinishPoint",
						"mazeTemp",
						"mazeFinal"
					);
			}
		}
	};

	cancelAnimations = () => {
		const {
			visitedCellsAnimation,
			shortestPathAnimation,
			mazeCreationAnimation,
		} = this.state;
		console.log(visitedCellsAnimation.length);
		visitedCellsAnimation.forEach((element) => clearTimeout(element));
		shortestPathAnimation.forEach((element) => clearTimeout(element));
		mazeCreationAnimation.forEach((element) => clearTimeout(element));
	};

	createMazeCell = (row, col) => {
		return { row: row, col: col };
	};

	setCol = (col) => {
		this.cancelAnimations();
		this.setState({ col: col });
		this.removeStartFinish();
		const gridRow = this.state.row;
		const gridCol = this.state.col;
		document.getElementById(`cell-${0}-${0}`).classList.add("StartPoint");
		document.getElementById(`cell-${0}-${0}`).classList.remove("CurrentWall");
		document
			.getElementById(`cell-${gridRow - 1}-${gridCol - 1}`)
			.classList.add("FinishPoint");
		document
			.getElementById(`cell-${gridRow - 1}-${gridCol - 1}`)
			.classList.remove("CurrentWall");
	};

	setRow = (row) => {
		this.cancelAnimations();
		this.setState({ row: row });
		this.removeStartFinish();

		const gridRow = this.state.row;
		const gridCol = this.state.col;
		document.getElementById(`cell-${0}-${0}`).classList.add("StartPoint");
		document.getElementById(`cell-${0}-${0}`).classList.remove("CurrentWall");
		document
			.getElementById(`cell-${gridRow - 1}-${gridCol - 1}`)
			.classList.add("FinishPoint");
		document
			.getElementById(`cell-${gridRow - 1}-${gridCol - 1}`)
			.classList.remove("CurrentWall");
	};

	render() {
		const { row, col } = this.state;
		return (
			<div>
				<NavigationMenu
					checkPassback={this.callBackFunction}
					resetPassback={this.resetPassback}
					selectedAlgorithm={this.selectedAlgorithm}
					setAllowDiagonal={this.setAllowDiagonal}
					setDontCutCorners={this.setDontCutCorners}
				/>
				<ControlButtons
					pathfind={this.computePath}
					reset={this.resetGrid}
					clearWalls={this.clearWalls}
					generateMaze={this.generateMaze}
				/>
				<div className="gridDisplay">
					<div className="rowSlider">
						<RowSlider setRow={this.setRow} />
					</div>
					<div className="col">
						<ColSlider setCol={this.setCol} />
						<Grid row={row} col={col} />
					</div>
				</div>
			</div>
		);
	}
}

Pathfinder.defaultProps = {
	row: 30,
	col: 30,
};

Pathfinder.propTypes = {
	row: PropTypes.number,
	col: PropTypes.number,
};

export default Pathfinder;
