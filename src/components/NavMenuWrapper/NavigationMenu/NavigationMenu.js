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
		props.resetPassback(newValue);
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
					<Tab label="Best First Search1" {...a11yProps(2)} />
					<Tab label="Best First Search2" {...a11yProps(3)} />
					<Tab label="Best First Search3" {...a11yProps(4)} />
					<Tab label="Best First Search4" {...a11yProps(5)} />
					<Tab label="Best First Search5" {...a11yProps(6)} />
					<Tab label="Best First Search6" {...a11yProps(7)} />
					<Tab label="Best First Search7" {...a11yProps(8)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setAllowDiagonal={props.setAllowDiagonal}
					setDontCutCorners={props.setDontCutCorners}
					disable={true}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={5}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={6}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={7}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
				/>
			</TabPanel>
			<TabPanel value={value} index={8}>
				<PathfindingOptions
					changeProp={props.checkPassback}
					setDontCutCorners={props.setDontCutCorners}
					setAllowDiagonal={props.setAllowDiagonal}
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
