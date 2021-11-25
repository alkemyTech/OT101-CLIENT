import React from 'react'
import Loader from "react-loader-spinner";

function Loading() {
    return (
        <div className='loader-container'>
            <Loader 
            type="TailSpin"
            color="#DB5752"
            height={100}
            width={100} />
        </div>
    )
}

export default Loading
