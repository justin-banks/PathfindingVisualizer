import React from "react";

import PathfindingOptions from "./PathfindingOptions";

export default {
	title: "PathfindingOptions",
	component: PathfindingOptions,
};

const Template = (args) => <PathfindingOptions {...args} />;

export const baseOptions = Template.bind({});
baseOptions.args = {};

export const disableRadioButtons = Template.bind({});
disableRadioButtons.args = { disable: true };
