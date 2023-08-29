import React, { useState, useRef, useEffect } from "react";
import Icons from "./icons";
import { Range, getTrackBackground } from 'react-range';

const colorOptions = [
    { en:'black', ua: 'Чорний'},
    { en:'white', ua: 'Білий'},
    { en:'silver', ua: 'Сірий'}
];

const sizeOptions = [
    "S", "M", "L", "XL", "XXL", "XXXL"
]

const priceFilter = ({ handleFiltersFields }) => {
    const STEP = 50;
    const MIN = 0;
    const MAX = 2000;
    const [rangeValues, setRangValues] = useState([0, MAX])
console.log(rangeValues, 'rangeValues');
    useEffect(() => {
      return handleFiltersFields()
    }, [rangeValues])

    return <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    }}
  >
    <input name="filter_price" className="hidden-checkbox-input" value={rangeValues}/>
    <Range
      values={rangeValues}
      step={STEP}
      min={MIN}
      max={MAX}
      onChange={(values) =>{ 
        setRangValues(values)
    }}
    renderTrack={({ props, children }) => (
      <div
        {...props}
        style={{
          height: "6px",
          width: "100%",
          backgroundColor: "#2d2d2d"
        }}
      >
        {children}
      </div>
    )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "20px",
            width: "20px",
            borderRadius: "4px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #AAA"
          }}
        >
          <div
            style={{
              height: "12px",
              width: "4px",
              backgroundColor: isDragged ? "#2d2d2d" : "#CCC"
            }}
          />
        </div>
      )}
    />

      <div style={{width: "100%", marginTop: "14px"}} className="flex-row flex-between">
            <div>
            {rangeValues[0]}
            </div>

            <div>
            {rangeValues[1]}
            </div>
      </div>
  </div>
}

const ColorFilter = ({ handleFiltersFields }) => {
    return <div className="filter-color flex-row">
        {colorOptions.map((el, i) => {
            return <label key={i} className="filter-item">
                <input className="hidden-checkbox-input"
                    name="filter_color"
                    value={el.ua}
                    type="checkbox"
                    onChange={handleFiltersFields}
                />
            
                <span className={"checkbox-mask checkbox-mask-" + el.en} >
                </span>
            </label>
        })}
    </div>
}

const SizesFilter = ({ handleFiltersFields }) => {
    return <div>
        {sizeOptions.map((el, i) => {
            return <label key={i} className="filter-item">
                <input 
                    className="hidden-checkbox-input size-input"
                    name="filter_size"
                    value={el}
                    type="checkbox"
                    onChange={handleFiltersFields}
                />
                
                <div className="custom-input">
                    <span className="custom-input_value">
                        {el}
                    </span>
                </div>
            </label>
        })}
    </div>
}

const filterComponents = [
    { title: 'Ціна', name: priceFilter },
    { title: 'Колір', name: ColorFilter },
    { title: 'Розмір', name: SizesFilter }
]

const ProductsFilter = ({ handleFilters }) => {
    const [activeItems, setActiveItem] = useState([]);
    const iconPlus = <Icons icon={'plus'} />
    const iconMinus = <Icons icon={'minus'} />
    const filterFormRef = useRef(null)

    const accordeonHandler = (i) => {
        setActiveItem((prevActiveItems) => {
            const arrayOfIndecies = [...prevActiveItems];
            if (arrayOfIndecies.includes(i)) {
                arrayOfIndecies.splice(arrayOfIndecies.indexOf(i), 1);
            } else {
                arrayOfIndecies.push(i);
            }

            return arrayOfIndecies;
        });
    }

    const handleFiltersFields = () => {
        const formData = new FormData(filterFormRef.current)
        handleFilters(formData)
    }

    return <div className="filters">
        <h1>Фільтри</h1>

        <div className="filters_list">
            <form ref={filterFormRef} className="filter-products-form">
                {filterComponents.map((el, i) => {
                    const Component = el.name

                    return <div key={i} className="filters_list-item accordion">
                        <div className="filters-title flex-row flex-between" onClick={() => accordeonHandler(i)}>
                            {el.title}
                            <span>
                                {activeItems.includes(i) ? iconMinus : iconPlus}
                            </span>
                        </div>

                        <div className={activeItems.includes(i) ? "accordion_content accordion--active" : "accordion_content"}>
                            <Component handleFiltersFields={handleFiltersFields} />
                        </div>
                    </div>
                })}
            </form>
        </div>
    </div>
}

export default ProductsFilter