import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function useSweetAlert(action, title, message) {
    switch (action) {
        case 'sucess':
            MySwal.fire(
                title,
                message,
                'success'
            )
            break;
        case 'confirm':
            MySwal.fire({
                title,
                message,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    MySwal.fire('Saved!', '', 'success')
                } else {
                    MySwal.fire('Canceled!', '', 'error')
                }
            })
            break;
        case 'cancel':
            MySwal.fire(
                title,
                message,
                'error'
            )
            break;
        case 'info':
            MySwal.fire(
                title,
                message,
                'info'
            )
            break;
        default:
            break;
    }
}

export default useSweetAlert
