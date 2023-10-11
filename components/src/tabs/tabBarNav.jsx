import React from "react"
import classNames from "classnames"

const TabBarNav = ({
    navLabel, className, onChangeActiveTab
}) => {
    const classes = classNames(
        'nav-item body1 mr-15',
        className
    )

    return <button
        className={classes}
        onClick={() => {onChangeActiveTab(navLabel)}}
    >
        {navLabel}
    </button>
}

export default TabBarNav