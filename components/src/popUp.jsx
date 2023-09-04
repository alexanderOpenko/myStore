import React from "react"
import Icons from "./icons"

const PopUp = ({background = 'white', children, active, setActive}) => {
    return <div className={"pop-up absolute " + active}>
        <div className="pop-up_content" style={{background: background}}>
            <div className="close-popup">
                <div className="close-popup-icon pointer standart-icon" onClick={() => setActive('inactive')}>
                    <Icons icon={'close'}/>
                </div>
            </div>
            {children}
        </div>
    </div>
}

export default PopUp