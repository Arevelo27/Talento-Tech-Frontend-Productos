import { api } from "./utils.js";
import { cargarDatosProductos, modal, showAlert } from "./script.js";

const form = document.querySelector("form");

// Función para cargar datos en el formulario
const cargarDatosEnFormulario = (producto) => {
    const { editar, codigo, activo, nombre, imagen, descripcion, edad } = form.elements;
    editar.value = producto.id;
    codigo.value = producto.codigo;
    nombre.value = producto.nombre;
    descripcion.value = producto.descripcion;
    imagen.value = producto.imagen;
    activo.value = producto.activo;
    edad.value = producto.edad;
};

// Función para manejar errores
const manejarError = (error) => {
    const mensaje = error?.response?.data?.message || "Error desconocido";
    showAlert("Error!", mensaje, "error");
};

window.editarProducto = (id) => {
    console.log(id)
    api
        .get("/producto/" + id)
        .then(({ data }) => {
            cargarDatosEnFormulario(data);
            modal.show(); // Abrir el modal
        })
        .catch(manejarError);
}

window.eliminarProducto = (id) => {
    Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "Cancelar",
    }).then(function (result) {
        if (result.isConfirmed) {
            api
                .delete("/producto/" + id)
                .then(({ data }) => {
                    console.log(data);
                    showAlert("Eliminado!", data.message, "success");
                    cargarDatosProductos();
                })
                .catch(manejarError);
        }
    });
}

window.limpiarFormulario = () => {
    form.reset();
}