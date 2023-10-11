var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from "react";
import Cart from "./cart";
import Icons from "./icons";
import classNames from "classnames";
import brandsList from "./menu";
import SexHook from "./sexHook";

var Menu = function Menu(_ref) {
    var menuJSON = _ref.menuJSON,
        menuType = _ref.menuType;

    var _useState = useState(-1),
        _useState2 = _slicedToArray(_useState, 2),
        activeItem = _useState2[0],
        setActiveItem = _useState2[1];

    var gridClass = classNames({ 'flex-row': menuType == 'desc' });

    var menuItems = menuJSON.map(function (item, i) {
        var menuItemsClass = classNames({
            'mobile-menu-item body20': menuType == 'mob',
            'menu-item': menuType == 'desc',
            'interactive-menu-item': item.submenu && menuType == 'desc'
        });

        var submenuClasses = classNames({
            'mobile-menu-item_submenu body1 ml-10': menuType == 'mob',
            'accordion_content': menuType == 'mob',
            'accordion--active': menuType == 'mob' && i == activeItem,
            'menu-item_submenu': menuType == 'desc'
        });

        var iconClass = classNames("mini-icon ml-5", {
            'icon--active': menuType == 'mob' && i == activeItem
        });

        var accordeonHandler = function accordeonHandler(i) {
            var value = i == activeItem ? -1 : i;
            setActiveItem(value);
        };

        if (item.submenu) {
            return React.createElement(
                "li",
                { className: menuItemsClass, key: item.title },
                React.createElement(
                    "div",
                    { className: "flex-row flex-between align-center pointer", onClick: function onClick() {
                            return accordeonHandler(i);
                        } },
                    React.createElement(
                        "div",
                        null,
                        item.title
                    ),
                    React.createElement(
                        "div",
                        { className: iconClass },
                        React.createElement(Icons, { icon: 'arrow_down' })
                    )
                ),
                menuType == 'desc' && React.createElement("div", { className: "menu-item-mask-background" }),
                React.createElement(
                    "ul",
                    { className: submenuClasses },
                    item.submenu.map(function (subitem) {
                        return React.createElement(
                            "li",
                            { className: "p10-0", key: subitem.title },
                            React.createElement(
                                "a",
                                { href: subitem.link },
                                subitem.title
                            )
                        );
                    })
                )
            );
        } else {
            return React.createElement(
                "li",
                { className: menuType == 'desc' ? "menu-item" : 'mobile-menu-item body20', key: item.title },
                React.createElement(
                    "a",
                    { href: item.link },
                    item.title
                )
            );
        }
    });
    return React.createElement(
        "nav",
        { className: "menu body18" },
        React.createElement(
            "ul",
            { className: gridClass },
            menuItems
        )
    );
};

var Header = function Header() {
    var sex = SexHook();

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        activeMobMenu = _useState4[0],
        setActiveMobMenu = _useState4[1];

    var _useState5 = useState(''),
        _useState6 = _slicedToArray(_useState5, 2),
        cartToggleClass = _useState6[0],
        setCartToggleClass = _useState6[1];

    var _useState7 = useState(-1),
        _useState8 = _slicedToArray(_useState7, 2),
        cartLength = _useState8[0],
        setCartLength = _useState8[1];

    var mobMenuHandler = function mobMenuHandler() {
        activeMobMenu ? setActiveMobMenu(false) : setActiveMobMenu(true);
    };

    var changeSex = function changeSex(_ref2) {
        var sex = _ref2.sex,
            menuType = _ref2.menuType;

        // if (menuType == 'mob') {
        //     const sexValue = sex ? sex : 'man'
        //     setMobileSex(sexValue)
        // } else {
        window.location.href = "/" + sex + "/home";
        // }
    };

    var _brandsList = brandsList(),
        manMenuJSON = _brandsList.manMenuJSON,
        womanMenuJSON = _brandsList.womanMenuJSON;

    var menuMobClass = classNames('menu-mobile', { 'menu-mobile-active': activeMobMenu });

    var toggleCartHandler = function toggleCartHandler(className) {
        document.querySelector('.mask').classList.toggle('mask-background');
        setCartToggleClass(className);
    };

    return React.createElement(
        "div",
        null,
        React.createElement(
            "header",
            null,
            React.createElement(
                "div",
                { className: "header-wrapper" },
                React.createElement(
                    "div",
                    { "class": "desc-menu header-body" },
                    React.createElement(
                        "div",
                        { className: "header-burger standart-icon", onClick: mobMenuHandler },
                        !activeMobMenu ? React.createElement(Icons, { icon: 'burger-menu' }) : React.createElement(Icons, { icon: 'close' })
                    ),
                    React.createElement(
                        "div",
                        { className: "desctop-sex" },
                        React.createElement(Sex, { sex: sex, changeSex: changeSex })
                    ),
                    React.createElement(
                        "div",
                        { "class": "header-logo logo pointer" },
                        React.createElement(
                            "a",
                            { href: "/" },
                            React.createElement("img", { src: "../../Assets/brada_logo.jpg" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "header-cart large-index flex-row flex-end" },
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "align-center justify-center standart-icon flex-row cart-count" },
                                cartLength > 0 ? cartLength : 0
                            ),
                            React.createElement(
                                "div",
                                { className: "cart-icon standart-icon", onClick: function onClick() {
                                        return toggleCartHandler('slide_in');
                                    } },
                                React.createElement(
                                    "svg",
                                    { xmlns: "http://www.w3.org/2000/svg", width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none" },
                                    React.createElement("path", { d: "M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z", fill: "black" })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "menu-desctop" },
                    React.createElement(Menu, { menuJSON: sex == 'man' ? manMenuJSON : sex == 'woman' ? womanMenuJSON : manMenuJSON, menuType: 'desc' })
                )
            ),
            React.createElement(
                "div",
                { className: menuMobClass },
                React.createElement(Sex, { sex: sex, changeSex: changeSex, menuType: "desc" }),
                React.createElement(Menu, { menuJSON: sex == 'man' ? manMenuJSON : sex == 'woman' ? womanMenuJSON : manMenuJSON, menuType: 'mob' })
            )
        ),
        React.createElement(Cart, { setCartLength: setCartLength, cartToggleClass: cartToggleClass, toggleCartHandler: toggleCartHandler })
    );
};

var Sex = function Sex(_ref3) {
    var sex = _ref3.sex,
        changeSex = _ref3.changeSex,
        menuType = _ref3.menuType;

    return React.createElement(
        "div",
        { "class": "flex-row" },
        [{ sex: 'man', tr: 'для нього' }, { sex: 'woman', tr: 'для неї' }].map(function (el) {
            var classes = classNames('change-sex-btn body1 uppercase border0', { 'active-sex': sex === el.sex });

            return React.createElement(
                "button",
                { className: classes, onClick: function onClick() {
                        return changeSex({ sex: el.sex, menuType: menuType });
                    } },
                el.tr
            );
        })
    );
};

export default Header;