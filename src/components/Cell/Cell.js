import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bgColor: "red",
		};
	}

	handleClick() {
		this.setState({
			bgColor: this.state.bgColor == "red" ? "blue" : "red",
		});
	}
	render() {
		return (
			<div className="Cell">
				<input
					type="button"
					className="CellButton"
					onClick={() => this.handleClick()}
					style={{ background: this.state.bgColor }}
				/>
			</div>
		);
	}
}

export default Cell;
