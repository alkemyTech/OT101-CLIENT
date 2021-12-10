import React, {useState} from 'react'
import { ArrowBackIos, ArrowForwardIos} from '@mui/icons-material'
import './ImageSlider.css'


function ImageSlider() {
    // TODO: Add style to mix properly with homepage, and define size of the slider.
    const [currentImg, setCurrentImg] = useState(0)

    let images = [{
        imageUrl: 'https://source.unsplash.com/random/1600x800',
        text: 'img1'
    },{
        imageUrl: 'https://source.unsplash.com/random/1600x802',
        text: 'img2'
    },{
        imageUrl: 'https://source.unsplash.com/random/1600x801',
        text: 'img3'
    }]

    return (
        <div className='carousel-outer'>
            <div className='carousel-inner' style={{background: `url(${images[currentImg].imageUrl})`}}>

                <div onClick={() => {
                    if (currentImg === 0) {
                        setCurrentImg(2)
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
                if (currentImg === 2) {
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
