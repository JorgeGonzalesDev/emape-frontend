const Swal = require('sweetalert2');

export const AlertAddUpdate = (id) => {
    if (id == 0) {
        Swal.fire({
            icon: 'success',
            title: 'Dato agregado con exito',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Dato actualizado con exito',
            text: ' dasdsadsasad',
            showConfirmButton: false,
            timer: 1500
        })
    }

}

export const AlertDelete = async () => {
    let res = false;

    await Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Accion realizado satisfactoriamente',
                '',
                'success'
            )
            res = true;
        }
    });
    return res;

}
