import React, { useEffect, useState } from "react"
import SexHook from "./sexHook";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const RandomProds = () => {
    console.log('fffff');
    const sex = SexHook()
    const [sliderImages, setSliderImages] = useState([])

    const getSlides = async () => {
        const resp = await fetch('/admin_sections?random_prods=true')
        const data = await resp.json()

        setSliderImages(data.body)
    }

    useEffect(() => {
        if (sex) {
            getSlides()
        }
    }, [sex])

    return sliderImages && <div className="mt-40">
        <div className="body24 bold-label mb-25">
            Рекомендації
        </div>

        <Swiper
            spaceBetween={15}
            slidesPerView={1.4}
            modules={[Navigation, Scrollbar]}
            speed={700}
            navigation
            scrollbar={{ draggable: true }}
            breakpoints={{
                998: {
                    slidesPerView: 4
                },
                769: {
                    slidesPerView: 3
                }
            }}
        >
            {sliderImages.map((el, i) => {
                return <SwiperSlide key={i} className={"relative"}>
                    <a href={'/' + sex + '/products?p=' + el.sku}>
                        <div className="swiper-slider-slide-img mb-10">
                            <img src={el.image_path} className="heigth100 cover absolute" />
                        </div>
                        
                        <div>
                            <div className="body1 primary-label">
                                {el.collection}
                            </div>

                            <div className="bold-label body1">
                                {el.producer}
                            </div>

                            <div className="body1 mb-10 prodcut-name">
                                {el.name}
                            </div>

                            <div className="product_info-price">
                                {el.price} ₴
                            </div>
                        </div>
                    </a>
                </SwiperSlide>
            })}
        </Swiper>
    </div>
}

export default RandomProds