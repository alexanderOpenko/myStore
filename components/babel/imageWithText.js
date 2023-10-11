import React from "react";

var ImageWithText = function ImageWithText(_ref) {
    var className = _ref.className,
        children = _ref.children,
        image = _ref.image;

    return React.createElement(
        "div",
        { className: 'flex-column-table ' + className },
        React.createElement(
            "div",
            { className: "image-section width50" },
            React.createElement("img", { className: "cover", src: image })
        ),
        React.createElement(
            "div",
            { className: "text-section width50" },
            children
        )
    );
};

export default ImageWithText;