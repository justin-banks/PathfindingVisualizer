import React from "react";

import ColSlider from "./ColSlider";

export default {
	title: "ColSlider",
	component: ColSlider,
};

const Template = (args) => <ColSlider {...args} />;

export const ColSliderBasic = Template.bind({});

ColSliderBasic.args = {};
