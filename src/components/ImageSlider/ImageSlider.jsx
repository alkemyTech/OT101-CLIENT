import React, {useState} from 'react'
import { ArrowBackIos, ArrowForwardIos} from '@mui/icons-material'
import './ImageSlider.css'


function ImageSlider({ slides = []}) {
    // TODO: Add style to mix properly with homepage, and define size of the slider.
    const [currentImg, setCurrentImg] = useState(0)

    const images = slides.slice().sort((s1, s2) => s1.order - s2.order);

    console.log(images);

    return !images.length ? null : (
        <div className='carousel-outer'>
            <div className='carousel-inner' style={{backgroundImage: `url(${images[currentImg].imageURL})`}}>

                <div onClick={() => {
                    if (currentImg === 0) {
                        setCurrentImg(images.length - 1)
                        return
                    }
                    setCurrentImg(prev => prev - 1 )
                }} className='left'>
                    <ArrowBackIos fontSize='large' style={{ fill: 'white'}}/>
                </div>
        
            <div className='center'>
                <span className='image-text'>{images[currentImg].text}</span>
            </div>
      
            <div onClick={() => {
                if (currentImg === images.length - 1) {
                    setCurrentImg(0)
                    return }
                
                    setCurrentImg(prev => prev + 1)
                    }} 
                    className='right'>
                    <ArrowForwardIos fontSize='large' style={{ fill: 'white'}}/>
                </div>
            </div>  
        </div>
    )
}

export default ImageSlider
