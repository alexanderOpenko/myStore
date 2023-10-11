import React from "react";
import classNames from "classnames";

var TabBarItem = function TabBarItem(_ref) {
    var children = _ref.children,
        label = _ref.label,
        activeTab = _ref.activeTab;

    var classes = classNames('tab-bar-item', { active: activeTab == label });

    return React.createElement(
        "div",
        { className: classes },
        children
    );
};

export default TabBarItem;