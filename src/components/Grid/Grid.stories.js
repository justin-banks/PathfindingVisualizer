import React from "react";

import Grid from "./Grid";

export default {
	title: "Grid",
	component: Grid,
};

const Template = (args) => <Grid {...args} />;

export const FirstGrid = Template.bind({});

FirstGrid.args = {
	row: 10,
	col: 10,
};

export const DefaultGrid = Template.bind({});

DefaultGrid.args = {};

export const MaxGrid = Template.bind({});

MaxGrid.args = {
	row: 200,
	col: 200,
};

export const MinGrid = Template.bind({});
MinGrid.args = {
	row: -3,
	col: -3,
};
