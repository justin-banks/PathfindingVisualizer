import React, { Component } from "react";
import "./Cell.css";
import styles from "../../utils/_variables.scss";
class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentWall: "",
			startPoint: "",
			finishPoint: "",
			wasWall: false,
		};
	}

	componentDidMount() {
		if (this.props.startPoint) {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.add("StartPoint");
		}
		if (this.props.finishPoint) {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.add("FinishPoint");
		}
	}

	handleMouseEnter = (row, col) => {
		const {
			mouseIsPressed,
			finishMoving,
			startMoving,
			becomingWall,
		} = this.props;
		const { startPoint, finishPoint } = this.state;
		if (
			!mouseIsPressed ||
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.contains("StartPoint") ||
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.contains("FinishPoint")
		)
			return;

		if (startMoving) {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.add("StartPoint");
			this.setState({
				wasWall: document
					.getElementById(`cell-${this.props.row}-${this.props.col}`)
					.classList.contains("CurrentWall"),
			});
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.remove("CurrentWall");
		} else if (finishMoving) {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.add("FinishPoint");
			this.setState({
				wasWall: document
					.getElementById(`cell-${this.props.row}-${this.props.col}`)
					.classList.contains("CurrentWall"),
			});
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.remove("CurrentWall");
		} else {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.remove(
					"cell-shortestPath",
					"mazeTemp",
					"mazeFinal",
					"cell-visited"
				);
			becomingWall
				? document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.add("CurrentWall")
				: document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.remove("CurrentWall");
		}
	};

	handleMouseDown = (row, col) => {
		const {
			mouseIsPressed,
			assertStartMoving,
			assertFinishMoving,
			assertBecomingWall,
			assertMouseIsPressed,
		} = this.props;
		const { startPoint, finishPoint, currentWall } = this.state;

		if (mouseIsPressed) return;

		if (
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.contains("FinishPoint")
		)
			assertFinishMoving();
		else if (
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.contains("StartPoint")
		)
			assertStartMoving();
		else {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.remove(
					"cell-shortestPath",
					"mazeTemp",
					"mazeFinal",
					"cell-visited"
				);

			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.contains("CurrentWall")
				? document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.remove("CurrentWall")
				: document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.add("CurrentWall");
			assertBecomingWall(
				document
					.getElementById(`cell-${this.props.row}-${this.props.col}`)
					.classList.contains("CurrentWall")
			);
		}
		assertMouseIsPressed();
	};

	handleMouseUp = () => {
		const { onMouseUp } = this.props;
		onMouseUp();
	};

	handleMouseLeave = (row, col) => {
		const { mouseIsPressed, finishMoving, startMoving } = this.props;
		if (!mouseIsPressed) return;

		if (startMoving) {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.remove("StartPoint");
			this.state.wasWall
				? document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.add("CurrentWall")
				: document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.remove("CurrentWall");
		} else if (finishMoving) {
			document
				.getElementById(`cell-${this.props.row}-${this.props.col}`)
				.classList.remove("FinishPoint");
			this.state.wasWall
				? document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.add("CurrentWall")
				: document
						.getElementById(`cell-${this.props.row}-${this.props.col}`)
						.classList.remove("CurrentWall");
		}
	};

	render() {
		const { row, col, onMouseDown, onMouseEnter, onMouseUp } = this.props;
		const { currentWall, startPoint, finishPoint } = this.state;
		return (
			<div
				id={`cell-${row}-${col}`}
				className={`Cell CellButton`}
				onMouseDown={() => this.handleMouseDown(row, col)}
				onMouseEnter={() => this.handleMouseEnter(row, col)}
				onMouseUp={() => this.handleMouseUp()}
				onMouseLeave={() => this.handleMouseLeave(row, col)}
			></div>
		);
	}
}

export default Cell;
