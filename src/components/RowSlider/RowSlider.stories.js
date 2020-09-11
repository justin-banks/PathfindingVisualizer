import React from "react";

import RowSlider from "./RowSlider";

export default {
	title: "RowSlider",
	component: RowSlider,
};

const Template = (args) => <RowSlider {...args} />;

export const RowSliderBasic = Template.bind({});

RowSliderBasic.args = {};
