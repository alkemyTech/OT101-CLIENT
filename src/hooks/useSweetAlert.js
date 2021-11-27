import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function useSweetAlert(action) {
    switch (action) {
        case 'confirm':
            MySwal.fire(
                'Acción confirmada',
                '',
                'success'
            )
            break;
        case 'cancel':
            MySwal.fire(
                'Acción cancelada',
                '',
                'error'
            )
            break;
        case 'info':
            MySwal.fire(
                'Información importante',
                '',
                'info'
            )
            break;
        default:
            break;
    }
}

export default useSweetAlert
