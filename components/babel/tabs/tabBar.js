var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useEffect, useState } from "react";
import React from "react";
import classNames from "classnames";
import TabBarNav from "./tabBarNav";

var TabBar = function TabBar(_ref) {
    var _ref$children = _ref.children,
        children = _ref$children === undefined ? [] : _ref$children,
        className = _ref.className;

    var _useState = useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        activeTab = _useState2[0],
        setActiveTab = _useState2[1];

    useEffect(function () {
        var activeTab = getChildrenLables()[0];
        setActiveTabHandler(activeTab);
    }, []);

    var getChildrenLables = function getChildrenLables() {
        return children.map(function (_ref2) {
            var props = _ref2.props;
            return props.label;
        });
    };

    var setActiveTabHandler = function setActiveTabHandler(tab) {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    var classes = classNames('tab-bar', className);

    var renderTabs = function renderTabs() {
        return getChildrenLables().map(function (navLabel) {
            return React.createElement(TabBarNav, {
                key: navLabel,
                navLabel: navLabel,
                className: classNames('primary-label uppercase', { active: activeTab === navLabel }),
                onChangeActiveTab: setActiveTabHandler
            });
        });
    };

    return React.createElement(
        "div",
        { className: classes },
        React.createElement(
            "div",
            { className: "tab-bar-nav flex-row mb-25" },
            renderTabs()
        ),
        React.createElement(
            "div",
            { className: "tab-container" },
            React.Children.map(children, function (child) {
                return React.cloneElement(child, { activeTab: activeTab });
            })
        )
    );
};

export default TabBar;