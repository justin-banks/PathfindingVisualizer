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
		return props.heuristicSelection;
	});

	const handleChange = (event) => {
		setValue(event.target.value);
		props.changeProp(event.target.value);
	};

	const [diagonalAllowed, setDiagonalAllowed] = React.useState(() => {
		return props.allowDiagonal;
	});
	const handleDiagonalAllowedChange = (event) => {
		setDiagonalAllowed(event.target.checked);
		props.setAllowDiagonal(event.target.checked);
	};

	const [dontCutCorners, setDontCutCorners] = React.useState(() => {
		return props.dontCutCorners;
	});
	const handleCutCorner = (event) => {
		setDontCutCorners(event.target.checked);
		props.setDontCutCorners(event.target.checked);
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
							value={"Manhattan"}
							control={<Radio size="small" disabled={props.disable} />}
							label="Manhattan"
						/>
						<FormControlLabel
							value={"Euclidean"}
							control={<Radio size="small" disabled={props.disable} />}
							label="Euclidean"
						/>
					</div>
					<div className="column">
						<FormControlLabel
							value={"Octile"}
							control={<Radio size="small" disabled={props.disable} />}
							label="Octile"
						/>
						<FormControlLabel
							value={"Chebyschev"}
							control={<Radio size="small" disabled={props.disable} />}
							label="Chebyschev"
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
									size="small"
								/>
							}
							label="allow diagonal"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={dontCutCorners}
									onChange={handleCutCorner}
									name="disallowCutCorner"
									color="secondary"
									size="small"
								/>
							}
							label="don't cut corners"
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
