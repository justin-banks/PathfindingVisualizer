import React from "react";
import Radio from "@material-ui/core/Radio";
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

	return (
		<div>
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
								control={<Radio size="small" />}
								label="Euclidean"
							/>
							<FormControlLabel
								value={"2"}
								control={<Radio size="small" />}
								label="Proportional"
							/>
						</div>
						<div className="column">
							<FormControlLabel
								value={"3"}
								control={<Radio size="small" />}
								label="Other"
							/>
							<FormControlLabel
								value={"4"}
								control={<Radio size="small" disabled={props.disable} />}
								label="(Disabled option)"
							/>
						</div>
					</div>
				</RadioGroup>
			</FormControl>
		</div>
	);
}

RadioButtonsGroup.propTypes = {
	disable: PropTypes.bool,
	changeProp: PropTypes.func,
};

RadioButtonsGroup.defaultProps = {
	disable: false,
	changeProp: null,
};
