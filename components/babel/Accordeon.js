var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import classNames from "classnames";
import React, { useState } from "react";
import Icons from "./icons";

export var Accordion = function Accordion(_ref) {
    var faqList = _ref.faqList;

    var _useState = useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        openId = _useState2[0],
        setId = _useState2[1];

    var clickHandler = function clickHandler(id) {
        if (id === openId) setId(null);else setId(id);
    };

    return React.createElement(
        "ul",
        { className: "accordion" },
        faqList.map(function (item, i) {
            var accordionClasses = classNames('accordion-collapse', { 'open': i == openId });

            var arrowClasses = classNames('mini-icon', { 'icon--active': i == openId });

            var html = { __html: item.a };

            return React.createElement(
                "li",
                { className: "accordion-item", key: i },
                React.createElement(
                    "button",
                    {
                        className: "accordion-header body1 uppercase width100 flex-between border0 flex-row align-center large-index",
                        onClick: function onClick() {
                            return clickHandler(i);
                        }
                    },
                    React.createElement(
                        "div",
                        null,
                        item.q
                    ),
                    React.createElement(
                        "div",
                        { className: arrowClasses },
                        React.createElement(Icons, { icon: 'arrow_down' })
                    )
                ),
                React.createElement(
                    "div",
                    {
                        className: accordionClasses
                    },
                    React.createElement("div", { className: "accordion-body body1", dangerouslySetInnerHTML: html })
                )
            );
        })
    );
};