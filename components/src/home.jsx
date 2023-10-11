import SexHook from "./sexHook"
import React, { useEffect, useState } from "react"
import ImageWithText from "./imageWithText"
import classNames from "classnames"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Home = () => {
    const man_image = '../../Assets/man_home.jpeg'
    const woman_image = '../../Assets/woman_home.jpeg'
    const sex = SexHook()
    const [sliderImages, setSliderImages] = useState([])

    const getSlides = async () => {
        const resp = await fetch(`/admin_sections?${sex}_slider=true`)
        const data = await resp.json()

        setSliderImages(data.body)
    }

    useEffect(() => {
        if (sex) {
            getSlides()
        }
    }, [sex])

    const imageTextClasses = classNames(
        'flex-row-reverse'
    )

    return sex && <div className="mt-40 homepage">
        <a href={sex == 'man' ? "/man/products?collection=Чоловічий одяг" : sex == 'woman' ? "/man/products?collection=Жіночий одяг" : ''}>
            <ImageWithText image={sex == 'man' ? man_image : woman_image} className={imageTextClasses}>
                <h1 className="mb-48 uppercase image-text-heading">
                    {sex == 'man' ?
                        'Великий вибір брендового одягу' :
                        'Жіночий брендовий одяг'
                    }</h1>

                <p className="body24 mb-48 image-text-text">
                    Верхній одяг, впізнавана класика та яскраві принти - зустрічайте новинки від ваших улюблених брендів
                </p>

                <button class="bold-label">
                    Дивитись всі
                </button>
            </ImageWithText>
        </a>

        {sliderImages && <div className="mt-40">
            <div className="body24 bold-label mb-25">
                Новинки з колекцій кращих брендів
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
                    return <SwiperSlide key={i}>
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
        </div>}
    </div>
}

export default Home