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
    const [activeSlider, setActiveSlider] = useState(0)

    const getProductMedia = async () => {
        const resp = await fetch(`/products?get_media=true&id=${productId}`);
        const json = await resp.json()
        const parsedBody = JSON.parse(json.body)
        setProductMedia(parsedBody);
    }

    useEffect(() => {
        getProductMedia()
    }, [])

    const imageClickHandler = (i) => {
        setActivePopUp('active')
        setActiveSlider(i)
    }

    return <div>
        {/* main images */}
        <div className="wrap-grid flex-row justify-center main-product-images">
            {productMedia.map((el, i) => {
                const gridClass = i <= 1 ? "two-desc-grid" : "three-desc-grid"

                if (el.media_type != 'video') {
                    return <div
                        key={i}
                        className={"cursor-zoom " + gridClass}
                        onClick={() => imageClickHandler(i)}>
                        <img src={el.image_path} />
                    </div>
                }
            })}
        </div>

        {/* video */}
        {productMedia.map((el, i) => {
            if (el.media_type == 'video') {
                return <div className="video-player">
                    <video width="750" height="500" controls>
                        <source src={el.image_path} type="video/mp4" />
                    </video>
                </div>
            }
        })}

        <PopUp active={activePopUp} setActive={setActivePopUp}>
            <div className="slider-product-page align-center flex-row">
                <ProductPageImagesSlider images={productMedia} activeSlider={activeSlider} />
            </div>
        </PopUp>
    </div>
}

const ProductPageImagesSlider = ({ images, activeSlider }) => {
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
                    <img src={el.image_path} />
                </SwiperSlide>
            }
        })}
    </Swiper>
}


export default ProductPageImages