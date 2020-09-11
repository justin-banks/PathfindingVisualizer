import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 300,
	},
	margin: {
		height: theme.spacing(3),
	},
}));

const marks = [
	{
		value: 3,
		label: "3 Cols",
	},
	{
		value: 30,
		label: "30 Cols",
	},
	{
		value: 150,
		label: "150 Cols",
	},
];

export default function ColSlider(props) {
	const classes = useStyles();

	function handleChange(event, value) {
		props.setCol(value);
	}
	function valuetext(value) {
		return `${value} cols`;
	}

	return (
		<div className={classes.root}>
			<Typography id="discrete-slider-custom" gutterBottom>
				Number of Columns
			</Typography>
			<Slider
				defaultValue={30}
				getAriaValueText={valuetext}
				aria-labelledby="discrete-slider-custom"
				min={3}
				max={150}
				step={1}
				valueLabelDisplay="auto"
				marks={marks}
				onChangeCommitted={handleChange}
			/>
		</div>
	);
}
