import React from "react";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./PathfindingOptions.css";
import PropTypes from "prop-types";

export default function RadioButtonsGroup(props) {
	const [value, setValue] = React.useState(() => {
		return "1";
	});

	const handleChange = (event) => {
		setValue(event.target.value);
		props.changeProp(event.target.value);
	};

	const [diagonalAllowed, setDiagonalAllowed] = React.useState(() => {
		return false;
	});
	const handleDiagonalAllowedChange = (event) => {
		console.log(event.target.checked);
		setDiagonalAllowed(event.target.checked);
		props.setAllowDiagonal(event.target.checked);
	};

	return (
		<FormControl component="fieldset" size="small">
			<FormLabel component="legend">Heuristic Choice</FormLabel>
			<RadioGroup
				aria-label="gender"
				name="gender1"
				value={value}
				onChange={handleChange}
			>
				<div className="row">
					<div className="column">
						<FormControlLabel
							value={"1"}
							control={<Radio size="small" disabled={props.disable} />}
							label="Euclidean"
						/>
						<FormControlLabel
							value={"2"}
							control={<Radio size="small" disabled={props.disable} />}
							label="Proportional"
						/>
					</div>
					<div className="column">
						<FormControlLabel
							value={"3"}
							control={<Radio size="small" disabled={props.disable} />}
							label="Other"
						/>
						<FormControlLabel
							value={"4"}
							control={<Radio size="small" disabled={props.disable} />}
							label="(Disabled option)"
						/>
					</div>
					<div className="column">
						<FormControlLabel
							control={
								<Checkbox
									checked={diagonalAllowed}
									onChange={handleDiagonalAllowedChange}
									name="diagonalAllowed"
									color="secondary"
								/>
							}
							label="allow diagonal"
						/>
					</div>
				</div>
			</RadioGroup>
		</FormControl>
	);
}

RadioButtonsGroup.propTypes = {
	disable: PropTypes.bool,
	changeProp: PropTypes.func,
	setAllowDiagonal: PropTypes.func,
};

RadioButtonsGroup.defaultProps = {
	disable: false,
	changeProp: null,
	setAllowDiagonal: null,
};
