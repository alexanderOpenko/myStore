import React, { useEffect, useState } from "react"

const VideoComponent = ({productId}) => {
const [productVideo, setProductVideo] = useState({image_path:''})

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


return <div className="video-player">
            <video width="750" height="500" controls>
               <source src={productVideo.image_path} type="video/mp4" />
            </video>
         </div>
}

export default VideoComponent