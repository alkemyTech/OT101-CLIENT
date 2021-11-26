import React from 'react';
/* import useSweetAlert from '../hooks/useSweetAlert'; */
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Home() {
    /* const alert = useSweetAlert(false); */
    
    return (
        <div>
            <h1>Home Component</h1>
            <button type='button' action={'confirm'}>Try button</button>
        </div>
    )
}

export default Home
