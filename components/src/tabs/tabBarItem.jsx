import React from "react"
import classNames from "classnames"

const TabBarItem = ({
    children, label, activeTab
}) => {
    const classes = classNames(
        'tab-bar-item',
        {active: activeTab == label}
    )

    return <div className={classes}>
        {children}
    </div> 
}

export default TabBarItem