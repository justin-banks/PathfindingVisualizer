import React, { Component } from "react";
import "./Grid.css";
import Cell from "./../Cell/Cell";

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
			row: this.props.row ? (this.props.row >= 2 ? this.props.row : 10) : 10,
			col: this.props.col ? (this.props.col >= 2 ? this.props.col : 10) : 10,
			prevRow: 0,
			prevCol: 0,
			mouseIsPressed: false,
			startMoving: false,
			finishMoving: false,
		};
	}
	componentDidMount() {
		const grid = initializeGrid(this.state.row, this.state.col);
		this.setState({ grid });
	}

	handleMouseDown(row, col) {
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
			const updatedGrid = toggleWall(this.state.grid, row, col);
			this.setState({ grid: updatedGrid });
		}
		this.setState({ mouseIsPressed: true });
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed && !this.state.startMoving) return;
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
			const updatedGrid = toggleWall(this.state.grid, row, col);
			this.setState({ grid: updatedGrid });
		}
	}

	handleMouseUp() {
		this.setState({
			startMoving: false,
			finishMoving: false,
			mouseIsPressed: false,
		});
	}

	render() {
		const { grid } = this.state;

		return (
			<div className="Grid">
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
										currentWall={currentWall}
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
	};
};

const toggleWall = (grid, row, col) => {
	const updatedGrid = [...grid];
	const cell = updatedGrid[row][col];
	const newCell = { ...cell, currentWall: !cell.currentWall };
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

export default Grid;
