import React, { useEffect, useState } from "react"
import Icons from "./icons";

const createMainUploadWidget = (func, id) => {
    const mainImageUploadWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dztn3fgbp',
        maxFiles: 1,
        uploadPreset: 'ml_default'
    }, async (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            const data = new FormData()
            data.append('public_id', result.info.public_id)
            data.append('id', id)
            data.append('url', result.info.secure_url)
            data.append('update_image', true)

            const url = '/admin_media'
            try {
                await fetch(url, {
                    method: "POST",
                    body: data
                })
            } catch (e) {
                console.log(e);
            }

            func(id)
        }
    }
    )
    return mainImageUploadWidget
}

const createOtherMediaUploadWidget = (func, id) => {
    const otheMediaUploadWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dztn3fgbp',
        maxFiles: 10,
        uploadPreset: 'ml_default'
    }, async (error, result) => {
        if (!error && result && result.event === "queues-end") {
            console.log('Done! Here is the image info: ', result.info)
            const data = new FormData()

            const rows = result.info.files.map((row) => {
                const public_id = row.uploadInfo.public_id
                const image_path = row.uploadInfo.secure_url
                const media_type = row.uploadInfo.resource_type

                const valuesArr = [public_id, image_path, media_type, id].map(el => {
                    if (typeof el != Number) {
                        return "'" + el + "'"
                    } else {
                        return el
                    }
                })
                const values = valuesArr.join(', ')
                const result = '(' + values + ')'
                return result
            })

            const insertString = rows.join(', ')
            console.log(insertString, 'insertString');

            data.append('insertString', insertString)
            data.append('other_media', true)

            const url = '/admin_media'
            try {
                await fetch(url, {
                    method: "POST",
                    body: data
                })
            } catch (e) {
                console.log(e);
            }

            func(id)
        }
    }
    )

    return otheMediaUploadWidget
}

const AdminMedia = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState({ sku: '', id: -1 })
    const [productMedia, setProductMedia] = useState([])
    const headerItems = ['sku', 'name']

    useEffect(() => {
        setSelectedProduct(products[0])
        getProductMedia(products[0].id)
    }, [])

    const getProductMedia = async (id) => {
        const resp = await fetch(`/products?get_media=true&id=${id}`);
        const json = await resp.json()
        const parsedBody = JSON.parse(json.body)
        setProductMedia(parsedBody);
    }

    const deleteImageHandler = async (pid, path) => {
        const resp = await fetch(`/admin_media?delete_media=true&id=${pid}&path=${path}`);
        console.log(selectedProduct.id, 'selectedProduct.id');
        getProductMedia(selectedProduct.id);
    }

    const productChangeHandler = (prod) => {
        setSelectedProduct(prod)
        getProductMedia(prod.id)
    }

    const mainImage = productMedia.length ? productMedia.find(el => el.media_type == 'main') : ''
    const additionalImages = productMedia.length ? productMedia.filter(el => el.media_type == 'image') : ''
    const videos = productMedia.length ? productMedia.filter(el => el.media_type == 'video') : ''

    const mainImageUploadWidget = createMainUploadWidget(getProductMedia, selectedProduct.id)
    const otheMediaUploadWidget = createOtherMediaUploadWidget(getProductMedia, selectedProduct.id)

    return <div>
        <div className="products-count">
            {products.length} позиції
        </div>

        <div className="product-images-section flex-column-table-reverse">
            <div className="products-list">
                <div className="products-list_header product-row">
                    {headerItems.map((el) => {
                        return <div className="product-row_item">
                            {el.title}
                        </div>
                    })}
                </div>

                {products.map((el) => {
                    return <div className={el.sku === selectedProduct.sku ? "product-row--active product-row" : "product-row"}
                        onClick={() => productChangeHandler(el)}
                    >
                        <div className="product-row_item">
                            {el.sku}
                        </div>

                        <div className="product-row_item">
                            {el.name}
                        </div>
                    </div>
                })}
            </div>

            <div className="product-media">
                <div className="main-image">
                    
                    <h2>
                        Main Image
                    </h2>

                    {mainImage && <div style={{height: '70%'}}>
                    {mainImage.image_path.includes("dropcommunity") ? 
                    <div className="warning">
                        BAD IMAGE URL: {mainImage.image_path}
                    </div> : ''}

                        <div>
                            <div className="delete_media standart-icon" onClick={() => {deleteImageHandler(mainImage.public_id, mainImage.id)}}>
                                <Icons icon={'close'}/>
                            </div>
                            
                            <img src={mainImage.image_path} />
                        </div>
                    </div>
                    }

                    {!mainImage && <button className="cloudinary-button" onClick={() => mainImageUploadWidget.open()}>
                        Upload file
                    </button>}
                </div>

                <div className="other-media">
                    <h2>
                        Other Media
                    </h2>
                    {additionalImages != '' && <div className="other-media_items">
                        <h2>
                            Images
                        </h2>

                        <div className="other-media_list flex-row wrap-grid">
                            {additionalImages.map((el) => {
                                return <div className="four-desc-grid">
                                    <div className="delete_media standart-icon" onClick={() => {deleteImageHandler(el.public_id, el.id)}}>
                                        <Icons icon={'close'}/>
                                    </div>
                                    <img src={el.image_path} />
                                </div>
                            })}
                        </div>
                    </div>
                    }

                   {videos != '' && <div className="other-media_items"> 
                        <h2>
                            Videos
                        </h2>

                        <div className="other-media_list flex-row wrap-grid">
                            {videos.map((el) => {
                                return <div className="four-desc-grid">
                                    <div className="delete_media standart-icon" onClick={() => {deleteImageHandler(el.public_id, el.id)}}>
                                    <Icons icon={'close'}/>
                                    </div>
                                    <img src={"http://res.cloudinary.com/dztn3fgbp/video/upload/" + el.public_id + '.jpg'} />
                                </div>
                            })}
                        </div>
                    </div>
                    }
                    <button className="cloudinary-button" onClick={() => otheMediaUploadWidget.open()}>
                        Upload files
                    </button>
                </div> 
            </div>
        </div>
    </div>
}

export default AdminMedia