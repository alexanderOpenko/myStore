import React, { useEffect, useState } from "react"
import PopUp from "./popUp"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const ProductPageImages = ({ productId }) => {
    const [activePopUp, setActivePopUp] = useState('inactive')
    const [productMedia, setProductMedia] = useState([])
    const [activeSlider, setActiveSlider] = useState(-1)
    const [windowWidth, setWindowWidth] = useState(770)

    const getProductMedia = async () => {
        const resp = await fetch(`/products?get_media=true&id=${productId}`);
        const json = await resp.json()
        const parsedBody = JSON.parse(json.body)

        parsedBody.sort((a, b) => {
            if (a.media_type === 'main')
                return -1;
            if (b.media_type === 'main')
                return 1;
            return 0;
        });
        setProductMedia(parsedBody);
    }

    useEffect(() => {
        getProductMedia()
        const windowWidthValue = window.innerWidth
        setWindowWidth(windowWidthValue)
    }, [])

    const imageViewCloseHandler = (action, i = null) => {
        setActivePopUp(action)
        window.scrollTo(0,0)
        document.body.classList.toggle('body-lock')
        if (i >= 0) {
            setActiveSlider(i)
        }
    }

    return <div>
        {/* main images */}
        {windowWidth >= 770 && <div className="wrap-grid flex-row justify-center main-product-images">
            {productMedia.map((el, i) => {
                const gridClass = i <= 1 ? "two-desc-grid" : "three-desc-grid"

                if (el.media_type != 'video') {
                    return <div
                        key={i}
                        className={"product-page-image cursor-zoom " + gridClass}
                        onClick={() => imageViewCloseHandler('active', i)}>
                        <img src={el.image_path} />
                    </div>
                }
            })} </div>}

        {activeSlider >= 0 && <PopUp active={activePopUp} setActive={imageViewCloseHandler} >
            <div className="slider-product-page align-center flex-row">
                <ProductPageImagesSlider images={productMedia} activeSlider={activeSlider} />
            </div>
        </PopUp>}

        {windowWidth <= 769 && <div className="slider-product-page mobile-slider-page align-center flex-row">
            <ProductPageImagesSlider images={productMedia} activeSlider={activeSlider} />
        </div>}
    </div>
}

const ProductPageImagesSlider = ({ images, activeSlider, s }) => {
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper) {
            swiper.slideTo(activeSlider);
        }
    }, [activeSlider])

    return <Swiper
        onSwiper={setSwiper}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Scrollbar]}
        speed={700}
        navigation
        scrollbar={{ draggable: true }}
    >
        {images.map((el, i) => {
            if (el.media_type != 'video') {
                return <SwiperSlide key={i}>
                    <div className="product-page-slide-image">
                        <img src={el.image_path} />
                    </div>
                </SwiperSlide>
            }
        })}
    </Swiper>
}


export default ProductPageImages