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
			this.setState({ startPoint: "StartPoint" });
		}
		if (this.props.finishPoint) {
			this.setState({ finishPoint: "FinishPoint" });
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
		console.log(startMoving);
		if (!mouseIsPressed || startPoint !== "" || finishPoint !== "") return;

		if (startMoving) {
			this.setState({
				startPoint: "StartPoint",
				wasWall: this.state.currentWall !== "",
				currentWall: "",
			});
		} else if (finishMoving) {
			this.setState({
				finishPoint: "FinishPoint",
				wasWall: this.state.currentWall !== "",
				currentWall: "",
			});
		} else {
			becomingWall
				? this.setState({ currentWall: "CurrentWall" })
				: this.setState({ currentWall: "" });
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

		if (finishPoint !== "") assertFinishMoving();
		else if (startPoint !== "") assertStartMoving();
		else {
			currentWall === ""
				? this.setState({ currentWall: "CurrentWall" })
				: this.setState({ currentWall: "" });
			assertBecomingWall(currentWall === "");
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
			this.setState({
				startPoint: "",
				currentWall: this.state.wasWall ? "CurrentWall" : "",
			});
		} else if (finishMoving) {
			this.setState({
				finishPoint: "",
				currentWall: this.state.wasWall ? "CurrentWall" : "",
			});
		}
	};

	render() {
		const { row, col, onMouseDown, onMouseEnter, onMouseUp } = this.props;
		const { currentWall, startPoint, finishPoint } = this.state;
		return (
			<div
				id={`cell-${row}-${col}`}
				className={`Cell CellButton ${currentWall} ${finishPoint} ${startPoint}`}
				onMouseDown={() => this.handleMouseDown(row, col)}
				onMouseEnter={() => this.handleMouseEnter(row, col)}
				onMouseUp={() => this.handleMouseUp()}
				onMouseLeave={() => this.handleMouseLeave(row, col)}
			></div>
		);
	}
}

export default Cell;
