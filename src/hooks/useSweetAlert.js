import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function useSweetAlert(input) {
    if(input === 'confirm'){
        MySwal.fire(
            'Acción confirmada',
            '',
            'success'
        )
    }
    else if(input === 'cancel'){
        MySwal.fire(
            'Acción cancelada',
            '',
            'error'
        )
    }
    else if(input === 'info'){
        MySwal.fire(
            'Información importante',
            '',
            'info'
        )
    }
    
}

export default useSweetAlert
