import Swal from 'sweetalert2';

export function basicAlert(title, message, icon) {
    Swal.fire(
        title,
        message,
        icon,
    )
}

export function confirmAlert (title, message, icon){
    return Swal.fire({
        title,
        message,
        icon,
        showCancelButton: true,
    });
}