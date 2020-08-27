import React from "react";

import Pathfinder from "./Pathfinder";

export default {
	title: "Pathfinder",
	component: Pathfinder,
};

const Template = (args) => <Pathfinder {...args} />;

export const PathfinderBasic = Template.bind({});

PathfinderBasic.args = {};
