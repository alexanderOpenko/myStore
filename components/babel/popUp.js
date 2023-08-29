import React from "react";
import Icons from "./icons";

var PopUp = function PopUp(_ref) {
    var _ref$background = _ref.background,
        background = _ref$background === undefined ? 'white' : _ref$background,
        children = _ref.children,
        active = _ref.active,
        setActive = _ref.setActive;

    return React.createElement(
        "div",
        { className: "pop-up absolute " + active },
        React.createElement(
            "div",
            { className: "pop-up_content", style: { background: background } },
            React.createElement(
                "div",
                { className: "close-popup" },
                React.createElement(
                    "div",
                    { className: "close-popup-icon pointer", onClick: function onClick() {
                            return setActive('inactive');
                        } },
                    React.createElement(Icons, { icon: 'close' })
                )
            ),
            children
        )
    );
};

export default PopUp;