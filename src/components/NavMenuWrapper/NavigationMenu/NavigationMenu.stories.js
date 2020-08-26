import React from "react";

import NavigationMenu from "./NavigationMenu";

export default {
	title: "Navigation Menu",
	component: NavigationMenu,
};

const Template = (args) => <NavigationMenu {...args} />;

export const BaseMenu = Template.bind({});
BaseMenu.args = { disable: true };
