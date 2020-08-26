import React, { Component } from "react";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
class NavMenuWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selection: "1",
		};
	}

	callBackFunction = (childSelection) => {
		this.setState({ selection: childSelection });
	};

	resetPassback = () => {
		console.log("here now");
		this.setState({ selection: "1" });
	};

	render() {
		return (
			<div>
				<NavigationMenu
					checkPassback={this.callBackFunction}
					resetPassback={this.resetPassback}
				/>
			</div>
		);
	}
}

export default NavMenuWrapper;
