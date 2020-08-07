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
			mouseIsPressed: false,
		};
	}
	componentDidMount() {
		const grid = initializeGrid(this.state.row, this.state.col);
		this.setState({ grid });
	}

	handleMouseDown(row, col) {
		const updatedGrid = toggleWall(this.state.grid, row, col);
		this.setState({ grid: updatedGrid, mouseIsPressed: true });
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed) return;
		const updatedGrid = toggleWall(this.state.grid, row, col);
		this.setState({ grid: updatedGrid });
	}

	handleMouseUp() {
		this.setState({ mouseIsPressed: false });
	}

	render() {
		const { grid } = this.state;

		return (
			<div className="Grid">
				{grid.map((row, rowIdx) => {
					return (
						<div key={rowIdx} className="GridRow">
							{row.map((cell, cellIdx) => {
								const { row, col, currentWall } = cell;
								return (
									<Cell
										key={cellIdx}
										col={col}
										row={row}
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
	return grid;
};

const createCellVal = (row, col) => {
	return {
		row,
		col,
		currentWall: false,
	};
};

const toggleWall = (grid, row, col) => {
	const updatedGrid = [...grid];
	const cell = updatedGrid[row][col];
	const newCell = { ...cell, currentWall: !cell.currentWall };
	updatedGrid[row][col] = newCell;
	return updatedGrid;
};

export default Grid;
