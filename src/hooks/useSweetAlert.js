import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function useSweetAlert({action}) {
    const MySwal = withReactContent(Swal);
    /* const [action, setAction] = useState(false); */
    if(action === 'confirm') {
        return (
            <>
                {MySwal.fire(
                    'Acción confirmada',
                    '',
                    'success'
                )}   
            </>
        )
    }
}

export default useSweetAlert
