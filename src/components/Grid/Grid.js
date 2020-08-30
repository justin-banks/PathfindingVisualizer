import React, { Component } from "react";
import "./Grid.css";
import Cell from "./../Cell/Cell";
import styles from "./../../utils/_variables.scss";
import PropTypes from "prop-types";

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mouseIsPressed: false,
			startMoving: false,
			finishMoving: false,
			becomingWall: true,
		};
	}

	assertStartMoving = () => {
		this.setState({ startMoving: true });
	};

	assertFinishMoving = () => {
		this.setState({ finishMoving: true });
	};

	assertBecomingWall = (becomingWall) => {
		this.setState({ becomingWall: becomingWall });
	};

	assertMouseIsPressed = () => {
		this.setState({ mouseIsPressed: true });
	};

	handleMouseUp = () => {
		this.setState({
			mouseIsPressed: false,
			finishMoving: false,
			startMoving: false,
		});
	};

	render() {
		const gridRows = this.props.row;
		const gridCols = this.props.col;
		const grid = initializeGrid(gridRows, gridCols);
		const {
			mouseIsPressed,
			startMoving,
			finishMoving,
			becomingWall,
		} = this.state;
		return (
			<div className="Grid">
				{grid.map((row, rowIdx) => {
					return (
						<div key={rowIdx} className="GridRow">
							{row.map((cell, cellIdx) => {
								const { row, col } = cell;
								return (
									<Cell
										key={cellIdx}
										startPoint={row === 0 && col === 0}
										finishPoint={row === gridRows - 1 && col === gridCols - 1}
										col={col}
										row={row}
										mouseIsPressed={mouseIsPressed}
										startMoving={startMoving}
										finishMoving={finishMoving}
										becomingWall={becomingWall}
										assertStartMoving={this.assertStartMoving}
										assertFinishMoving={this.assertFinishMoving}
										assertBecomingWall={this.assertBecomingWall}
										assertMouseIsPressed={this.assertMouseIsPressed}
										onMouseUp={this.handleMouseUp}
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
	};
};

Grid.defaultProps = {
	row: 30,
	col: 30,
	handleMouseDown: null,
};

Grid.propTypes = {
	row: PropTypes.number,
	col: PropTypes.number,
	handleMouseDown: PropTypes.func,
};

export default Grid;
