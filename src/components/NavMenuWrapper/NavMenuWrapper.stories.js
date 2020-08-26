import React from "react";

import NavMenuWrapper from "./NavMenuWrapper";

export default {
	title: "NavMenuWrapper",
	component: NavMenuWrapper,
};

const Template = (args) => <NavMenuWrapper {...args} />;

export const NavMenu = Template.bind({});

NavMenu.args = {};
