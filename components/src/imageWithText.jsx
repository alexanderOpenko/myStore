import React from "react"

const ImageWithText = ({className, children, image}) => {
    return <div className={'flex-column-table ' + className}>
        <div className="image-section width50">
            <img className="cover" src={image} />
        </div>

        <div className="text-section width50">
            {children}
        </div>
    </div>
}

export default ImageWithText;