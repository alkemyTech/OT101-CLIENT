import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function sweetAlertService(title, message, icon, showCancelButton) {
    if(showCancelButton === false) {
        MySwal.fire(
            title,
            message,
            icon
        )
    } else {
        MySwal.fire({
            title,
            message,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire('Acción confirmada!', '', 'success')
            } else {
                MySwal.fire('Acción Cancelada!', '', 'error')
            }
        })
    }
}

export default sweetAlertService