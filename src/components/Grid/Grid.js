import React, { Component } from "react";
import "./Grid.css";
import Cell from "./../Cell/Cell";

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
			row: this.props.row ? this.props.row : 10,
			col: this.props.col ? this.props.col : 10,
		};
	}
	componentDidMount() {
		const grid = initializeGrid(this.state.row, this.state.col);
		this.setState({ grid });
	}
	render() {
		const { grid } = this.state;

		return (
			<div className="Grid">
				{grid.map((row, rowIdx) => {
					return (
						<div key={rowIdx} className="GridRow">
							{row.map((cell, cellIdx) => {
								const { row, col } = cell;
								return <Cell key={cellIdx} col={col} row={row} />;
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
	};
};

export default Grid;
