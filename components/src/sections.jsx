import React, { useEffect, useState } from "react";

const SectionsAdmin = () => {
    const [manSelectValue, setManSelectValue] = useState([])
    const [womanSelectValue, setWomanSelectValue] = useState([])
    const [productsList, setProductsList] = useState([])
    const [selectedMan, setSelectedMan] = useState([])
    const [selectedWoman, setSelectedWoman] = useState([])

    const requestProdsList = async () => {
       const resp = await fetch('/admin_sections?slider_list=true')
       const json = await resp.json()
       setProductsList(json.body)

       const respSlides = await fetch('/admin_sections?get_selected_slides=true')
       const jsonSlides = await respSlides.json()
       setManSelectValue(jsonSlides.body.man.join().split(','))
       setWomanSelectValue(jsonSlides.body.woman.join().split(','))
    }

    useEffect(() => {
        requestProdsList()
    }, [])

    // man
    const manHandleChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value);
        setManSelectValue(selectedOptions);
    };

    const manHandleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData
        data.append('action', 'update_man_slider')
        data.append('prods_id', manSelectValue)

        const resp = await fetch('/admin_sections', {
            method: "POST",
            body: data
        })

        const d = await resp.json()
    }

    //woman
    const womanHandleChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value);
        setWomanSelectValue(selectedOptions);
    };

    const womanHandleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData
        data.append('action', 'update_woman_slider')
        data.append('prods_id', womanSelectValue)

        const resp = await fetch('/admin_sections', {
            method: "POST",
            body: data
        })

        const d = await resp.json()
    }

    return <div className="admin-slides">
        <div>
            <div className="body24 mb-10 bold-label">
                Слайдер чоловічих товарів на головній 
            </div>

            <div className="bold-label mb-10 uppercase">
              Вибрані товари: {manSelectValue.join(', ')}
            </div>
            
            <div className="man-slider-section">
                <form onSubmit={manHandleSubmit}>
                    <select multiple={true} value={manSelectValue} onChange={manHandleChange} name="prods_id" className="mb-10">
                        {productsList.map((option) => (
                            <option 
                            key={option.id} 
                            value={option.sku}
                            >
                                {option.sku}
                            </option>
                        ))}
                    </select>

                    <button type="submit">
                        Зберегти
                    </button>
                </form>
            </div>
        </div>

        <div>
        
        <div className="body24 mb-10 bold-label">
            Слайдер жіночих товарів на головній 
        </div>

        <div className="bold-label mb-10 uppercase">
            Вибрані товари: {womanSelectValue.join(', ')}
        </div>

        <div className="man-slider-section">
            <form onSubmit={womanHandleSubmit}>
                <select multiple={true} value={womanSelectValue} onChange={womanHandleChange} name="prods_id" className="mb-10">
                    {productsList.map((option) => (
                        <option 
                        key={option.id} 
                        value={option.sku}
                        >
                            {option.sku}
                        </option>
                    ))}
                </select>

                <button type="submit">
                    Зберегти
                </button>
            </form>
        </div> 
        </div>               
    </div>
}

export default SectionsAdmin;