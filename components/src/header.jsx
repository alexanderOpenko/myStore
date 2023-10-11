import React, { useEffect, useState } from "react"
import Cart from "./cart"
import Icons from "./icons"
import classNames from "classnames"
import brandsList from "./menu"
import SexHook from "./sexHook"

const Menu = ({ menuJSON, menuType }) => {
    const [activeItem, setActiveItem] = useState(-1);

    const gridClass = classNames(
        { 'flex-row': menuType == 'desc' }
    )

    const menuItems = menuJSON.map((item, i) => {
        const menuItemsClass = classNames(
            {
                'mobile-menu-item body20': menuType == 'mob',
                'menu-item': menuType == 'desc',
                'interactive-menu-item': (item.submenu && menuType == 'desc')
            }
        )

        const submenuClasses = classNames(
            {
                'mobile-menu-item_submenu body1 ml-10': menuType == 'mob',
                'accordion_content': menuType == 'mob',
                'accordion--active': (menuType == 'mob' && i == activeItem),
                'menu-item_submenu': menuType == 'desc',
            }
        )

        const iconClass = classNames(
            "mini-icon ml-5",
            {
                'icon--active': (menuType == 'mob' && i == activeItem)
            }
        )

        const accordeonHandler = (i) => {
            const value = i == activeItem ? -1 : i
            setActiveItem(value)
        }

        if (item.submenu) {
            return (
                <li className={menuItemsClass} key={item.title}>
                    <div className="flex-row flex-between align-center pointer" onClick={() => accordeonHandler(i)}>
                        <div>{item.title}</div>
                        <div className={iconClass}>
                            <Icons icon={'arrow_down'} />
                        </div>
                    </div>

                    {menuType == 'desc' && <div className="menu-item-mask-background"></div>}

                    <ul className={submenuClasses}>
                        {item.submenu.map(subitem => (
                            <li className="p10-0" key={subitem.title}>
                                <a href={subitem.link}>{subitem.title}</a>
                            </li>
                        ))}
                    </ul>
                </li>
            )
        } else {
            return (
                <li className={menuType == 'desc' ? "menu-item" : 'mobile-menu-item body20'} key={item.title}>
                    <a href={item.link}>{item.title}</a>
                </li>
            )
        }
    })
    return (
        <nav className="menu body18">
            <ul className={gridClass}>
                {menuItems}
            </ul>
        </nav>
    )
}

const Header = () => {
    const sex = SexHook()
    const [activeMobMenu, setActiveMobMenu] = useState(false)
    const [cartToggleClass, setCartToggleClass] = useState('')
    const [cartLength, setCartLength] = useState(-1)

    const mobMenuHandler = () => {
        activeMobMenu ? setActiveMobMenu(false) : setActiveMobMenu(true)
    }

    const changeSex = ({ sex, menuType }) => {
        // if (menuType == 'mob') {
        //     const sexValue = sex ? sex : 'man'
        //     setMobileSex(sexValue)
        // } else {
            window.location.href = `/${sex}/home`
        // }
    }

    const { manMenuJSON, womanMenuJSON } = brandsList()
    const menuMobClass = classNames(
        'menu-mobile',
        { 'menu-mobile-active': activeMobMenu }
    )

    const toggleCartHandler = (className) => {
        document.querySelector('.mask').classList.toggle('mask-background')
        setCartToggleClass(className)
      }    
    
    return <div>
        <header>
        <div className="header-wrapper">
            <div class="desc-menu header-body">
                <div className="header-burger standart-icon" onClick={mobMenuHandler}>
                    {!activeMobMenu ? <Icons icon={'burger-menu'} /> : <Icons icon={'close'} />}
                </div>

                <div className="desctop-sex">
                    <Sex sex={sex} changeSex={changeSex} />
                </div>

                <div class="header-logo logo pointer">
                    <a href="/">
                    <img src='../../Assets/brada_logo.jpg' />
                    </a>
                </div>

                <div class="header-cart large-index flex-row flex-end">
                    <div>
                        <div className="align-center justify-center standart-icon flex-row cart-count">
                            {cartLength > 0 ? cartLength : 0}                            
                        </div>

                        <div className="cart-icon standart-icon" onClick={() => toggleCartHandler('slide_in')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                <path d="M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z" fill="black" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menu-desctop">
                <Menu menuJSON={sex == 'man' ? manMenuJSON : sex == 'woman' ? womanMenuJSON : manMenuJSON} menuType={'desc'} />
            </div>
        </div>

        <div className={menuMobClass}>
            <Sex sex={sex} changeSex={changeSex} menuType={"desc"} />
            <Menu menuJSON={sex == 'man' ? manMenuJSON : sex == 'woman' ? womanMenuJSON : manMenuJSON} menuType={'mob'} />
        </div>
        </header>

        <Cart setCartLength={setCartLength} cartToggleClass={cartToggleClass} toggleCartHandler={toggleCartHandler}/>
    </div>
}

const Sex = ({ sex, changeSex, menuType }) => {
    return <div class="flex-row">
        {
            [{ sex: 'man', tr: 'для нього' }, { sex: 'woman', tr: 'для неї' }].map((el) => {
                const classes = classNames(
                    'change-sex-btn body1 uppercase border0',
                    { 'active-sex': sex === el.sex }
                )

                return <button className={classes} onClick={() => changeSex({ sex: el.sex, menuType: menuType })}>
                    {el.tr}
                </button>
            })
        }
    </div>
}

export default Header