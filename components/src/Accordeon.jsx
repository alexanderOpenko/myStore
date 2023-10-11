import classNames from "classnames";
import React, {useState} from "react";
import Icons from "./icons";

export const Accordion = ({ faqList }) => {
    const [openId, setId] = useState(null)

    const clickHandler = (id) => {
        if (id === openId) setId(null)
        else setId(id); 
    }

    return <ul className="accordion">
        {faqList.map((item, i) => {
            const accordionClasses = classNames(
                'accordion-collapse',
                {'open': i == openId}
            )

            const arrowClasses = classNames(
                'mini-icon',
                {'icon--active': i == openId}
            )

            const html = {__html:item.a}

            return <li className="accordion-item" key={i}>
                <button
                    className="accordion-header body1 uppercase width100 flex-between border0 flex-row align-center large-index"
                    onClick={() => clickHandler(i)}
                    >
                        <div>{item.q}</div>
                        <div className={arrowClasses}>
                            <Icons icon={'arrow_down'} />
                        </div>
                </button>

                <div
                    className={accordionClasses}
                >
                    <div className="accordion-body body1" dangerouslySetInnerHTML={html}>
                    </div>
                </div>
            </li>
        })}
    </ul>
} 