import React from "react";
import classNames from "classnames";

var TabBarNav = function TabBarNav(_ref) {
    var navLabel = _ref.navLabel,
        className = _ref.className,
        onChangeActiveTab = _ref.onChangeActiveTab;

    var classes = classNames('nav-item body1 mr-15', className);

    return React.createElement(
        "button",
        {
            className: classes,
            onClick: function onClick() {
                onChangeActiveTab(navLabel);
            }
        },
        navLabel
    );
};

export default TabBarNav;