const Swal = require('sweetalert2');

export const AlertAddUpdate = (id) => {
    if (id == 0) {
        Swal.fire({
            icon: 'success',
            title: 'Registrado con exito',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Actualizado con exito',
            showConfirmButton: false,
            timer: 1500
        })
    }

}

export const AlertError = async (message = "Ha ocurrido un error") => {
    return Swal.fire({
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
    });
}

export const AlertSuccess = async (message = `Acción realizada <br>satisfactoriamente`, timer=1500) => {
    return Swal.fire({
        icon: "success",
        title: `${message}`,
        showConfirmButton: false,
        timer: timer,
    });
}

export const AlertWarning = async (message = `Ha ocurrido algo`) => {
    return Swal.fire({
        icon: "warning",
        title: `${message}`,
        showConfirmButton: false,
        timer: 3500,
    });
}

export const AlertDelete = async (message = "Estas seguro?", text = "") => {
    let res = false;
    await Swal.fire({
        title: `${message}`,
        text: `${text}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008f39',
        cancelButtonColor: '#7B817B',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                {
                    title: 'Accion realizado satisfactoriamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                }
            )
            res = true;
        }
    });
    return res;

}
