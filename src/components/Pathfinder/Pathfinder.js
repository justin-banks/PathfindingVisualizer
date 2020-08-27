import React, { Component } from "react";
import NavigationMenu from "./../NavMenuWrapper/NavigationMenu/NavigationMenu";
import Grid from "./../Grid/Grid";
import ControlButtons from "./../ControlButtons/ControlButtons";
import { aStar } from "./../../algorithms/aStar";
import { dijkstra, getShortestPath } from "./../../algorithms/dijkstra";
import PropTypes from "prop-types";

const maxRow = 60;
const maxCol = 60;
const minRow = 2;
const minCol = 2;

class Pathfinder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selection: "1",
			algorithm: 0,
			grid: [],
			prevRow: 0,
			prevCol: 0,
			row: 0,
			col: 0,
			mouseIsPressed: false,
			startMoving: false,
			finishMoving: false,
			resetOption: false,
			visitedCells: [],
			becomingWall: true,
		};
	}

	componentDidMount() {
		const grid = initializeGrid(
			Math.min(Math.max(this.props.row, minRow), maxRow),
			Math.min(Math.max(this.props.col, minCol), maxCol)
		);
		this.setState({
			grid: grid,
			row: Math.min(this.props.row, maxRow),
			col: Math.min(this.props.col, maxCol),
		});
	}

	handleMouseDown = (row, col) => {
		console.log(this);
		console.log(row);
		console.log(col);
		if (this.state.mouseIsPressed) return;
		console.log(this.state.grid[0][0].startPoint);
		if (this.state.grid[row][col].startPoint) {
			this.setState({
				startMoving: true,
				prevRow: row,
				prevCol: col,
			});
		} else if (this.state.grid[row][col].finishPoint) {
			this.setState({
				finishMoving: true,
				prevRow: row,
				prevCol: col,
			});
		} else {
			document
				.getElementById(`cell-${row}-${col}`)
				.classList.toggle("CurrentWall");
			this.setState({
				grid: setWall(
					this.state.grid,
					row,
					col,
					document
						.getElementById(`cell-${row}-${col}`)
						.classList.contains("CurrentWall")
				),
				becomingWall: document
					.getElementById(`cell-${row}-${col}`)
					.classList.contains("CurrentWall"),
			});
		}
		this.setState({ mouseIsPressed: true });
	};

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed && !this.state.startMoving) return;

		if (
			this.state.grid[row][col].startPoint ||
			this.state.grid[row][col].finishPoint
		)
			return;

		if (this.state.startMoving) {
			const updatedGrid = toggleStart(
				this.state.grid,
				this.state.prevRow,
				this.state.prevCol,
				row,
				col
			);
			this.setState({ grid: updatedGrid, prevRow: row, prevCol: col });
		} else if (this.state.finishMoving) {
			const updatedGrid = toggleFinish(
				this.state.grid,
				this.state.prevRow,
				this.state.prevCol,
				row,
				col
			);
			this.setState({ grid: updatedGrid, prevRow: row, prevCol: col });
		} else {
			if (this.state.becomingWall) {
				document
					.getElementById(`cell-${row}-${col}`)
					.classList.add("CurrentWall");
			} else {
				document
					.getElementById(`cell-${row}-${col}`)
					.classList.remove("CurrentWall");
			}
			this.setState({
				grid: setWall(this.state.grid, row, col, this.state.becomingWall),
			});
		}
	}

	handleMouseUp() {
		console.log("mouse Up");
		console.log("");
		this.setState({
			startMoving: false,
			finishMoving: false,
			mouseIsPressed: false,
		});
	}

	resetGrid = () => {
		const { grid } = this.state;
		for (const row of grid) {
			for (const cell of row) {
				cell.distance = Infinity;
				cell.beenVisited = false;
				cell.parent = null;
				cell.heuristicDistance = Infinity;
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.remove("cell-visited");
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.remove("cell-shortestPath");
			}
		}
		this.setState({ resetOption: false, grid: grid });
	};

	visualizeAlgorithm(visitedCells) {
		const shortestPath = getShortestPath(this.state.grid);
		for (let i = 1; i < visitedCells.length; i++) {
			if (i === visitedCells.length - 1) {
				setTimeout(() => {
					this.animateShortestPath(shortestPath);
				}, 10 * i);
				this.setState({ resetOption: true });
				return;
			}
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
			setTimeout(() => {
				const cell = shortestPath[i];
				document
					.getElementById(`cell-${cell.row}-${cell.col}`)
					.classList.add("cell-shortestPath");
			}, 50 * i);
		}
	}

	computePath = () => {
		this.resetGrid();
		const { grid } = this.state;
		var visitedCells = [];
		switch (this.state.algorithm) {
			case 0:
				visitedCells = dijkstra(grid);
				break;
			case 1:
				const tempHeuristic = makeHeuristic();
				visitedCells = aStar(grid, tempHeuristic);
				break;
		}
		this.setState({ visitedCells: visitedCells });
		this.visualizeAlgorithm(visitedCells);
	};

	callBackFunction = (childSelection) => {
		this.setState({ selection: childSelection });
	};

	resetPassback = () => {
		this.setState({ selection: "1" });
	};

	selectedAlgorithm = (algorithm) => {
		this.setState({ algorithm: algorithm });
	};

	render() {
		const { grid, row, col } = this.state;
		return (
			<div>
				<NavigationMenu
					checkPassback={this.callBackFunction}
					resetPassback={this.resetPassback}
					selectedAlgorithm={this.selectedAlgorithm}
				/>
				<ControlButtons pathfind={this.computePath} reset={this.resetGrid} />
				<Grid
					row={row}
					col={col}
					grid={grid}
					handleMouseDown={this.handleMouseDown}
					handleMouseUp={() => this.handleMouseUp()}
					handleMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
				/>
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

const initializeGrid = (row, col) => {
	const grid = [];
	for (let i = 0; i < row; i++) {
		const gridRow = [];
		for (let j = 0; j < col; j++) {
			console.log(i);
			gridRow.push(createCellVal(i, j));
		}
		grid.push(gridRow);
	}
	grid[0][0].startPoint = true;
	grid[row - 1][col - 1].finishPoint = true;
	return grid;
};

const createCellVal = (row, col) => {
	return {
		row,
		col,
		currentWall: false,
		startPoint: false,
		finishPoint: false,
		distance: Infinity,
		parent: null,
		beenVisited: false,
		heuristicDistance: Infinity,
	};
};

const setWall = (grid, row, col, isWall) => {
	const updatedGrid = [...grid];
	const cell = updatedGrid[row][col];
	const newCell = { ...cell, currentWall: isWall };
	updatedGrid[row][col] = newCell;
	return updatedGrid;
};

const toggleStart = (grid, prevRow, prevCol, row, col) => {
	const updatedGrid = [...grid];
	const prevCell = updatedGrid[prevRow][prevCol];
	const cell = updatedGrid[row][col];
	const newPrevCell = { ...prevCell, startPoint: false };
	const newCell = { ...cell, startPoint: true };
	updatedGrid[prevRow][prevCol] = newPrevCell;
	updatedGrid[row][col] = newCell;
	return updatedGrid;
};

const toggleFinish = (grid, prevRow, prevCol, row, col) => {
	const updatedGrid = [...grid];
	const prevCell = updatedGrid[prevRow][prevCol];
	const cell = updatedGrid[row][col];
	const newPrevCell = { ...prevCell, finishPoint: false };
	const newCell = { ...cell, finishPoint: true };
	updatedGrid[prevRow][prevCol] = newPrevCell;
	updatedGrid[row][col] = newCell;
	return updatedGrid;
};

const makeHeuristic = () => {
	return function (cellRow, cellCol, finishRow, finishCol) {
		const deltaRow = Math.abs(cellRow - finishRow);
		const deltaCol = Math.abs(cellCol - finishCol);
		return (
			((10 * Math.min(deltaRow, deltaCol) + 10 * Math.max(deltaRow, deltaCol)) *
				1001) /
			1000
		);
	};
};

export default Pathfinder;
