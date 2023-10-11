import { useEffect, useState } from "react"

const BrandsList = () => {
    const [brandsList, setBrandsList] = useState([])

    const getBrandsList = async () => {
        const resp = await fetch('/admin_producers?get_producers_list=true')
        const json = await resp.json()

        return json.body
    }

    useEffect(() => {
        async function fetchData() {
        const brandsList = await getBrandsList()
    
        const transformedBrandsList = brandsList.map((el) => {
            return {
                title: el.name,
                link: `/products?brand=${el.name}`
            }
        })

        setBrandsList(transformedBrandsList.sort((a, b) => a.title.localeCompare(b.title)))
    }

    fetchData()
    }, [])

    const manMenuJSON = [
        {
            title: 'Одяг',
            link: '',
            submenu: [
                {
                    title: 'Футболки',
                    link: "/man/products?collection=Футболки"
                },
                {
                    title: 'Поло',
                    link: "/man/products?collection=Поло"
                },
                {
                    title: 'Кофти',
                    link: "/man/products?collection=Кофти"
                },
                {
                    title: 'Світшоти',
                    link: "/man/products?collection=Світшоти"
                },
                {
                    title: 'Худі',
                    link: "/man/products?collection=Худі"
                },
                {
                    title: 'Куртки',
                    link: "/man/products?collection=Куртки"
                },
                {
                    title: 'Жилетки',
                    link: "/man/products?collection=Жилетки"
                },
                {
                    title: 'Вітровки',
                    link: "/man/products?collection=Вітровки"
                },
                {
                    title: 'Костюми',
                    link: "/man/products?collection=Костюми"
                },
                {
                    title: 'Штани',
                    link: "/man/products?collection=Штани"
                },
                {
                    title: 'Шорти',
                    link: "/man/products?collection=Шорти"
                },
                {
                    title: 'Спідня Білизна',
                    link: "/man/products?collection=Спідня Білизна"
                }
            ]
        },
        {
            title: 'Кросівки',
            link: "/man/products?collection=Кросівки"
        },
        {
            title: 'Аксесуари',
            submenu: [
                {
                    title: 'Шапки',
                    link: '/man/products?collection=Шапки'
                },
                {
                    title: 'Кепки',
                    link: '/man/products?collection=Кепки'
                },
                {
                    title: 'Гаманці',
                    link: "/man/products?collection=Гаманці"
                },
                {
                    title: 'Сумки',
                    link: '/man/products?collection=Сумки'
                }
            ]
        },
        {
            title: 'Бренди',
            submenu: brandsList
        },
        {
            title: 'Всі товари',
            link: "/man/products?collection=Чоловічий одяг"
        }
    ]
    
     const womanMenuJSON = [
        {
            title: 'Одяг',
            link: '',
            submenu: [
                {
                    title: 'Футболки',
                    link: "/woman/products?collection=Жіночі футболки"
                },
                {
                    title: 'Світшоти',
                    link: "/woman/products?collection=Жіночі світшоти"
                },
                {
                    title: 'Худі',
                    link: "/woman/products?collection=Жіночі худі"
                },
                {
                    title: 'Шапки',
                    link: "/woman/products?collection=Жіночі Шапки"
                }
            ]
        },
        {
            title: 'Всі товари',
            link: "/woman/products?collection=Жіночий одяг"
        }
    ]

    return {
        manMenuJSON: manMenuJSON,
        womanMenuJSON: womanMenuJSON,
        brandsList: brandsList
    }
}

export default BrandsList
