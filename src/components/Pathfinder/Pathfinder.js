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
		};
	}

	componentDidMount() {
		/*this.setState({
			row: Math.min(this.props.row, maxRow),
			col: Math.min(this.props.col, maxCol),
		});*/
		this.setState({ row: 50, col: 120 });
	}

	resetGrid = () => {
		const { row, col } = this.state;
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("cell-visited");
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("cell-shortestPath");
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
		for (let i = 1; i <= visitedCells.length; i++) {
			if (i === visitedCells.length) {
				setTimeout(() => {
					this.animateShortestPath(shortestPath);
				}, 10 * i);
				this.setState({ resetOption: true });
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
			setTimeout(() => {
				const cell = visitedCells[i];
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.add("cell-visited");
			}, 10 * i);
		}
	}

	animateShortestPath(shortestPath) {
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
			setTimeout(() => {
				const cell = shortestPath[i];
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.add("cell-shortestPath");
			}, 50 * i);
		}
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
		for (let i = 0; i < createdMaze.length; i++) {
			const currCell = createdMaze[i];
			if (currCell.beenConnected) {
				setTimeout(() => {
					document
						.getElementById(`cell-${currCell.row}-${currCell.col}`)
						.classList.remove("mazeTemp");
					document
						.getElementById(`cell-${currCell.row}-${currCell.col}`)
						.classList.add("mazeFinal");
				}, 20 * i);
			} else {
				setTimeout(() => {
					document
						.getElementById(`cell-${currCell.row}-${currCell.col}`)
						.classList.remove("CurrentWall");
					document
						.getElementById(`cell-${currCell.row}-${currCell.col}`)
						.classList.add("mazeTemp");
				}, 20 * i);
			}
		}
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				setTimeout(() => {
					document
						.getElementById(`cell-${i}-${j}`)
						.classList.remove("mazeTemp", "mazeFinal");
				}, 20 * createdMaze.length);
			}
		}
	};

	removeStartFinish = () => {
		const { row, col } = this.state;
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				document
					.getElementById(`cell-${i}-${j}`)
					.classList.remove("StartPoint", "FinishPoint");
			}
		}
	};

	createMazeCell = (row, col) => {
		return { row: row, col: col };
	};

	setCol = (col) => {
		this.setState({ col: col });
		this.removeStartFinish();
		const gridRow = this.state.row;
		const gridCol = this.state.col;
		document.getElementById(`cell-${0}-${0}`).classList.add("StartPoint");
		document
			.getElementById(`cell-${gridRow - 1}-${gridCol - 1}`)
			.classList.add("FinishPoint");
	};

	setRow = (row) => {
		this.setState({ row: row });
		this.removeStartFinish();

		const gridRow = this.state.row;
		const gridCol = this.state.col;
		document.getElementById(`cell-${0}-${0}`).classList.add("StartPoint");
		document
			.getElementById(`cell-${gridRow - 1}-${gridCol - 1}`)
			.classList.add("FinishPoint");
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
