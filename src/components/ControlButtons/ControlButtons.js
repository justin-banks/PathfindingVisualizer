import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

export default function ControlButtons(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Button variant="contained" color="primary" onClick={props.pathfind}>
				Pathfind
			</Button>
			<Button variant="contained" color="secondary" onClick={props.reset}>
				Reset Pathfinding
			</Button>
			<Button variant="contained" color="secondary" onClick={props.clearWalls}>
				Clear Walls
			</Button>
		</div>
	);
}

ControlButtons.defaultProps = {
	pathfind: null,
	reset: null,
};

ControlButtons.propTypes = {
	pathfind: PropTypes.func,
	reset: PropTypes.func,
};
