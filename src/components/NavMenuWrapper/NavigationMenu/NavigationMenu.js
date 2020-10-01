import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PathfindingOptions from "./PathfindingOptions/PathfindingOptions";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component={"span"}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SimpleTabs(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		props.selectedAlgorithm(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs
					value={value}
					variant="scrollable"
					scrollButtons="auto"
					onChange={handleChange}
					aria-label="simple tabs example"
				>
					<Tab label="Dijkstra" {...a11yProps(0)} />
					<Tab label="A star" {...a11yProps(1)} />
					<Tab label="Best First Search" {...a11yProps(2)} />
					<Tab label="Jump Point Search" {...a11yProps(3)} />
					<Tab label="Breadth First Search" {...a11yProps(4)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setAllowDiagonal={props.setAllowDiagonal}
					setDontCutCorners={props.setDontCutCorners}
					disable={true}
					heuristicSelection={props.heuristicSelection}
					dontCutCorners={props.dontCutCorners}
					allowDiagonal={props.allowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
					disable={false}
					heuristicSelection={props.heuristicSelection}
					dontCutCorners={props.dontCutCorners}
					allowDiagonal={props.allowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
					disable={false}
					heuristicSelection={props.heuristicSelection}
					dontCutCorners={props.dontCutCorners}
					allowDiagonal={props.allowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
					disable={false}
					heuristicSelection={props.heuristicSelection}
					dontCutCorners={props.dontCutCorners}
					allowDiagonal={props.allowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
					disable={true}
					heuristicSelection={props.heuristicSelection}
					dontCutCorners={props.dontCutCorners}
					allowDiagonal={props.allowDiagonal}
				/>
			</TabPanel>
		</div>
	);
}

SimpleTabs.propTypes = {
	checkPassback: PropTypes.func,
	resetPassback: PropTypes.func,
	selectedAlgorithm: PropTypes.func,
};

SimpleTabs.defaultProps = {
	checkPassback: null,
	resetPassback: null,
	selectedAlgorithm: null,
};
