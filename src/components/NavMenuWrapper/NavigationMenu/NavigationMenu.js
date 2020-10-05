import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PathfindingOptions from "./PathfindingOptions/PathfindingOptions";
import Button from "@material-ui/core/Button";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";

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

const TooltipButtonInTabs = ({ className, hoverText, children }) => {
	return (
		<Tooltip
			className={className}
			title={hoverText}
			children={children}
		></Tooltip>
	);
};

export default function SimpleTabs(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		props.selectedAlgorithm(newValue);
	};

	const handleLightDarkToggle = () => {
		props.toggleLightDarkMode();
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
					<TooltipButtonInTabs hoverText="toggle between light and dark mode">
						<Button onClick={() => handleLightDarkToggle()}>
							<BrightnessHigh />
						</Button>
					</TooltipButtonInTabs>
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
					biasResults={props.biasResults}
					setBiasResults={props.setBiasResults}
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
					biasResults={props.biasResults}
					setBiasResults={props.setBiasResults}
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
					biasResults={props.biasResults}
					setBiasResults={props.setBiasResults}
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
					biasResults={props.biasResults}
					setBiasResults={props.setBiasResults}
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
					biasResults={props.biasResults}
					setBiasResults={props.setBiasResults}
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
