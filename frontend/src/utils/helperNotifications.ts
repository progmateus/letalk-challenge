import Swal from 'sweetalert2'


export const fireSuccessNotification = (message: string) => {
  Swal.fire({
    text: message,
    icon: 'success'
  })
}