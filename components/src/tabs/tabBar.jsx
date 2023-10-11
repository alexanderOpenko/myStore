import { useEffect, useState } from "react"
import React from "react"
import classNames from "classnames"
import TabBarNav from "./tabBarNav"

const TabBar = ({
    children = [], className
}) => {
    const [activeTab, setActiveTab] = useState('')

    useEffect(() => {
        const activeTab = getChildrenLables()[0]
        setActiveTabHandler(activeTab)
    }, [])

    const getChildrenLables = () => {
        return children.map(({ props }) => props.label)
    }

    const setActiveTabHandler = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

    const classes = classNames(
        'tab-bar',
        className
    )

    const renderTabs = () => {
        return getChildrenLables().map((navLabel) => {
            return <TabBarNav
            key={navLabel}
            navLabel={navLabel}
            className={classNames('primary-label uppercase', {active: activeTab === navLabel})}
            onChangeActiveTab={setActiveTabHandler}
            />
        })
    }

    return <div className={classes}>
        <div className="tab-bar-nav flex-row mb-25">
            {renderTabs()} 
        </div>

        <div className="tab-container">
            {React.Children.map(children, child => React.cloneElement(child, { activeTab}))}
        </div>
    </div>
}

export default TabBar