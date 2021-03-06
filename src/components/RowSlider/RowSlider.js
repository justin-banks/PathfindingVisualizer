import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 130,
		height: 300,
	},
	margin: {
		height: theme.spacing(3),
	},
}));

const marks = [
	{
		value: 3,
		label: "3 Rows",
	},
	{
		value: 30,
		label: "30 Rows",
	},
	{
		value: 150,
		label: "150 Rows",
	},
];

function valuetext(index) {
	return `${index} rows`;
}

export default function RowSlider(props) {
	const classes = useStyles();

	function handleChange(event, value) {
		props.setRow(value);
	}

	return (
		<div className={classes.root}>
			<Typography id="discrete-slider-custom" gutterBottom>
				Number of Rows
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
				orientation="vertical"
				onChangeCommitted={handleChange}
				color="secondary"
			/>
		</div>
	);
}
