import React, { useState, useRef, useEffect } from "react";
import Icons from "./icons";
import { Range } from 'react-range';
import { sortSizesHook } from "./products";
// import BrandsList from "./menu";

const PriceFilter = ({ handleFiltersFields, data }) => {
  const STEP = 40;
  const MIN = data[0]
  const MAX = data[1];
  const [rangeValues, setRangValues] = useState([MIN, MAX])

  if (data[0] == data[1]) {
    return <div>
      <input name="filter_price" className="hidden-checkbox-input" readOnly value={rangeValues} />

      Єдина ціна: {data[1]}
    </div>
  }

  useEffect(() => {
    handleFiltersFields()
  }, [rangeValues])

  return <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    }}
  >
    <input name="filter_price" className="hidden-checkbox-input" readOnly value={rangeValues} />
    <Range
      values={rangeValues}
      step={STEP}
      min={MIN}
      max={MAX}
      onChange={(values) => {
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

    <div style={{ width: "100%", marginTop: "14px" }} className="flex-row flex-between">
      <div>
        {rangeValues[0]}
      </div>

      <div>
        {rangeValues[1]}
      </div>
    </div>
  </div>
}

const ColorFilter = ({ handleFiltersFields, data }) => {
  return <div className="filter-color flex-row wrap-grid">
    {data.map((el, i) => {
      return <label key={i} className="filter-item">
        <input className="hidden-checkbox-input"
          name="filter_color"
          value={el}
          type="checkbox"
          onChange={handleFiltersFields}
        />

        <span className={"checkbox-mask"} style={{ backgroundColor: el }}>
        </span>
      </label>
    })}
  </div>
}

const SizesFilter = ({ handleFiltersFields, data }) => {
  const sortedSizes = sortSizesHook({size:data})

  return <div>
    {sortedSizes.map((el, i) => {
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

const brandFilter = ({ handleFiltersFields, data }) => {
  console.log(data, 'databrands');
  return <div>
    {data.sort((a, b) => a.localeCompare(b)).map((el, i) => {
      return <label key={i} className="filter-item">
        <input
          className="hidden-checkbox-input size-input"
          name="filter_brand"
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

const ProductsFilter = ({ handleFilters, collection, products, toggleFilterHandler }) => {
  const [activeItems, setActiveItem] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [maxMinPrices, setMaxMinPridces] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [sizesList, setSizesList] = useState([]);

  const iconPlus = <Icons icon={'plus'} />
  const iconMinus = <Icons icon={'minus'} />
  const filterFormRef = useRef(null)

  useEffect(() => {
    const listOfBrands = []
    const listOfColors = []
    const listOfSizes = []
    const prices = []

    products.forEach((el) => {
      if (!listOfBrands.includes(el.producer)) {
        if (el.producer) {
        listOfBrands.push(el.producer)
        }
      }

      if (el.color && !listOfColors.includes(el.color)) {
        listOfColors.push(el.color)
      }

      if (el) {
        el.size.forEach((e) => {
          if (!listOfSizes.includes(e)) {
            listOfSizes.push(e)
          }
        }
        )
      }

      prices.push(el.price)
    })
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    setMaxMinPridces([min, max])

    setBrandsList(listOfBrands)
    setSizesList(listOfSizes)
    setColorList(listOfColors)
  }, [])

  const filterComponents = [
    { title: 'Ціна', name: PriceFilter, data: maxMinPrices },
    { title: 'Колір', name: ColorFilter, data: colorList },
    { title: 'Розмір', name: SizesFilter, data: sizesList },
    { title: 'Бренд', name: brandFilter, data: brandsList }
  ]

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

  return !!maxMinPrices.length && <div className="filters">
    <div className="flex-row align-center flex-between">
      <h1>Фільтри</h1>
      <div className="standart-icon" onClick={() => toggleFilterHandler('slide_out')}>
        <Icons icon={'close'} />
      </div>
    </div>

    <div className="filters_list">
      <form ref={filterFormRef} className="filter-products-form">
        {filterComponents.map((el, i) => {
          const Component = el.name

          return <div key={i} className="filters_list-item accordion">
            <div className="filters-title flex-row flex-between pointer" onClick={() => accordeonHandler(i)}>
              <div>
              {el.title}
              </div>
              <span className="standart-icon">
                {activeItems.includes(i) ? iconMinus : iconPlus}
              </span>
            </div>

            <div className={activeItems.includes(i) ? "accordion_content accordion--active" : "accordion_content"}>
              <Component handleFiltersFields={handleFiltersFields} data={el.data} />
            </div>
          </div>
        })}
      </form>
    </div>
  </div>
}

export default ProductsFilter