import React from 'react'
import { Link } from 'react-router-dom';

function Error404() {
    return (
        <>
            <h1>The url can not be found</h1>
            <button><Link to='/' exact='true'>Back to Home</Link></button>
        </>
    )
}

export default Error404
