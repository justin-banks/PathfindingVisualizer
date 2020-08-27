import React, { Component } from "react";
import "./Grid.css";
import Cell from "./../Cell/Cell";
import styles from "./../../utils/_variables.scss";
import PropTypes from "prop-types";

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { grid } = this.props;
		const { handleMouseDown, handleMouseUp, handleMouseEnter } = this.props;
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
										onMouseDown={handleMouseDown}
										onMouseUp={() => handleMouseUp()}
										onMouseEnter={() => handleMouseEnter(row, col)}
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
	handleMouseDown: null,
};

Grid.propTypes = {
	row: PropTypes.number,
	col: PropTypes.number,
	handleMouseDown: PropTypes.func,
};

export default Grid;
