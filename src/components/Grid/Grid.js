import React, { Component } from "react";
import "./Grid.css";
import Cell from "./../Cell/Cell";
import { dijkstra, getShortestPath } from "./../../algorithms/dijkstra";
import styles from "./../../utils/_variables.scss";
import PropTypes from "prop-types";
import { aStar } from "./../../algorithms/aStar";

const maxRow = 60;
const maxCol = 60;
const minRow = 2;
const minCol = 2;

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			grid,
			row: Math.min(this.props.row, maxRow),
			col: Math.min(this.props.col, maxCol),
		});
	}

	handleMouseDown(row, col) {
		if (this.state.mouseIsPressed) return;
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
	}

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

	resetGrid() {
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
	}

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

	computePath() {
		this.resetGrid();
		const { grid } = this.state;
		//const visitedCells = dijkstra(grid);
		const tempHeuristic = makeHeuristic();
		const visitedCells = aStar(grid, tempHeuristic);
		this.setState({ visitedCells: visitedCells });
		this.visualizeAlgorithm(visitedCells);
	}

	render() {
		const { grid, resetOption } = this.state;
		const resetButtonDisp = resetOption ? (
			<input
				type="button"
				value="Reset Grid"
				onClick={() => this.resetGrid()}
			/>
		) : null;

		return (
			<div className="Grid">
				<input
					type="button"
					value="press to visualize"
					onClick={() => this.computePath()}
				/>
				<div>{resetButtonDisp}</div>
				{grid.map((row, rowIdx) => {
					return (
						<div key={rowIdx} className="GridRow">
							{row.map((cell, cellIdx) => {
								const { row, col, currentWall, startPoint, finishPoint } = cell;
								return (
									<Cell
										key={cellIdx}
										col={col}
										row={row}
										startPoint={startPoint}
										finishPoint={finishPoint}
										onMouseDown={(row, col) => this.handleMouseDown(row, col)}
										onMouseUp={() => this.handleMouseUp()}
										onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
									>
										{" "}
									</Cell>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}

Grid.defaultProps = {
	row: 30,
	col: 30,
};

Grid.propTypes = {
	row: PropTypes.number,
	col: PropTypes.number,
};

const initializeGrid = (row, col) => {
	const grid = [];
	for (let i = 0; i < row; i++) {
		const gridRow = [];
		for (let j = 0; j < col; j++) {
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

export default Grid;
