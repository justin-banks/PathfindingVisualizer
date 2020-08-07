import React, { Component } from "react";
import "./Cell.css";
import styles from "../../utils/_variables.scss";
class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bgColor: styles.mainColor,
		};
	}

	render() {
		const {
			row,
			col,
			startPoint,
			finishPoint,
			onMouseDown,
			onMouseEnter,
			onMouseUp,
			currentWall,
		} = this.props;
		const appendedClass = startPoint
			? "StartPoint"
			: finishPoint
			? "FinishPoint"
			: currentWall
			? "CurrentWall"
			: "";
		return (
			<div className="Cell">
				<input
					type="button"
					className={`CellButton ${appendedClass}`}
					onMouseDown={() => onMouseDown(row, col)}
					onMouseEnter={() => onMouseEnter(row, col)}
					onMouseUp={() => onMouseUp()}
				/>
			</div>
		);
	}
}

export default Cell;
