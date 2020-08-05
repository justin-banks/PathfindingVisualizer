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

	handleClick() {
		this.setState({
			bgColor:
				this.state.bgColor === styles.mainColor
					? styles.secondaryColor
					: styles.mainColor,
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
