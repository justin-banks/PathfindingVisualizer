import React from "react";

import ControlButtons from "./ControlButtons";

export default {
	title: "ControlButtons",
	component: ControlButtons,
};

const Template = (args) => <ControlButtons {...args} />;

export const defaultButtons = Template.bind({});
defaultButtons.args = {};
