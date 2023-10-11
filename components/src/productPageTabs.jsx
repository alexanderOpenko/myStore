import React, { useEffect, useState } from "react"
import TabBarItem from "./tabs/TabBarItem"
import TabBar from "./tabs/tabBar"

const ProductPageTabs = ({ info, productId }) => {
   const [productVideo, setProductVideo] = useState({ image_path: '' })

   const getProductMedia = async () => {
      const resp = await fetch(`/products?get_video=true&id=${productId}`);
      const json = await resp.json()
      const parsedBody = JSON.parse(json.body)
      if (parsedBody) {
         setProductVideo(parsedBody);
      }
   }

   useEffect(() => {
      getProductMedia()
   }, [])

   return <TabBar>
      <TabBarItem label="опис">
         <div className="flex-row flex-column-mobile align-start flex-between">
            <div className="flex-row wrap-grid tabs-text-columns">
               <div className="three-desc-grid full-mob-grid">
                  <div className="tab-column-wrapper">
                     <div className="info-label primary-label body1">
                        {info.collection}
                     </div>

                     <h2 className="info-label bold-label">
                        {info.producer}
                     </h2>

                     <div className="info-label body1">
                        {info.name}
                     </div>
                  </div>
               </div>

               {info.compound && <div className="three-desc-grid full-mob-grid">
                  <div clasName="tab-column-wrapper">
                     <h4 className="body1">Склад</h4>
                     <p className="body1">
                        {info.compound}
                     </p>
                  </div>
               </div>}

               {info.description && <div className="three-desc-grid full-mob-grid">
                  <div className="tab-column-wrapper">
                     <h4 className="body1">Детальніше про товар</h4>
                     <p className="body1">
                        {info.description}
                     </p>
                  </div>
               </div>}

               {info.measure && <div className="three-desc-grid full-mob-grid">
                  <div clasName="tab-column-wrapper">
                     <h4 className="body1">Заміри</h4>
                     <p className="body1">
                        {info.measure.split(';').map((el) => {
                           return <p>
                              {el}
                           </p>
                        })}
                     </p>
                  </div>
               </div>}

               <div className="three-desc-grid full-mob-grid">
                  <div className="tab-column-wrapper">
                     <h4 className="body1">Артикул товару</h4>
                     <p className="body1">
                        {info.sku}
                     </p>
                  </div>
               </div>
            </div>

            {!!productVideo.image_path && <div className="tabs-video video-player">
               <video controls>
                  <source src={productVideo.image_path} type="video/mp4" />
               </video>
            </div>}
         </div>
      </TabBarItem>

      <TabBarItem label="доставка та обмін">
         <div className="flex-row wrap-grid">
            <div className="three-desc-grid full-mob-grid">
               <div className="tab-column-wrapper">
                  <h4>Доставка</h4>
                  <p className="body1">
                     Ви можете забрати своє замовлення в нашому офісі в м. Вінниця у зручний для вас час.
                     Або ми можемо відправити його компанією Нова Пошта до вибраного вами відділення або адреси.
                     Вартість доставки залежить від тарифів перевізника та ваги замовлення.
                     Якщо ви вибрали доставку кур’єром, то кур’єр зв’яжеться з вами по телефону для уточнення часу доставки.
                  </p>
               </div>
            </div>

            <div className="three-desc-grid full-mob-grid">
               <div className="tab-column-wrapper">
                  <h4>Час доставки</h4>
                  <p className="body1">
                     Термін виконання доставки - 1-3 робочих дні.
                     Відправлення здійснюється щоденно до 18:00.
                     Доставка з м. Вінниця
                  </p>
               </div>
            </div>

            <div className="three-desc-grid full-mob-grid">
               <div className="tab-column-wrapper">
                  <h4>Оплата</h4>
                  <p className="body1">
                     Ви можете сплатити покупки зручним для вас способом:
                     Накладений платіж
                     Грошовим переказом - на рахунок ФОП компанії
                  </p>
               </div>
            </div>

            <div className="three-desc-grid full-mob-grid">
               <div className="tab-column-wrapper">
                  <h4>Обмін та повернення</h4>
                  <p className="body1">
                     Ви можете повернути або обміняти товар протягом 14 днів з моменту отримання замовлення.
                     Для цього потрібно зберегти товар у первинній упаковці та чек.
                     Ви можете повернути товар безкоштовно в нашому офісі в м. Вінниця або відправити його компанією Нова Пошта.
                     Після отримання товару, наш товарознавець перевірить його стан та відповідність опису.
                     Якщо все буде в порядку, ми повернемо вам гроші на вашу картку або обміняємо товар на інший за вашим бажанням.
                     Якщо ви маєте питання щодо повернення або обміну, звертайтеся до нашого менеджера за телефоном +380 (67) 123-45-67.
                  </p>
               </div>
            </div>
         </div>
      </TabBarItem>
   </TabBar>
}

export default ProductPageTabs