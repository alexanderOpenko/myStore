import React, { useEffect, useState } from "react"
import PopUp from "./popUp"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const RenderImages = ({ images, openImage }) => {
    return images.map((el, i) => {
        if (el.media_type != 'video') {
            return <div key={i} className="two-desc-grid cursor-zoom" onClick={() => openImage('active')}>
                <img src={el.image_path} />
            </div>
        }
    })
}

const ProductPageImages = ({ productId }) => {
    const [activePopUp, setActivePopUp] = useState('inactive')
    const [productMedia, setProductMedia] = useState([])

    const getProductMedia = async () => {
        const resp = await fetch(`/products?get_media=true&id=${productId}`);
        const json = await resp.json()
        const parsedBody = JSON.parse(json.body)
        setProductMedia(parsedBody); 
    }

    useEffect(() => {
        getProductMedia()
    }, [])

    return <div>
        <div className="wrap-grid flex-row">
            <RenderImages images={productMedia} openImage={setActivePopUp} />
        </div>

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
                <ProductPageImagesSlider images={productMedia} />
            </div>
        </PopUp>
    </div>
}

const ProductPageImagesSlider = ({ images }) => {
    return <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Scrollbar]}
        speed={700}
        navigation
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
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