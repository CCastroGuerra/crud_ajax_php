
function init() {
  var formulario = document.getElementById("formulario");
  formulario.onsubmit = function (e) {
    guardarTarea(e);
  };
}

/*********************/
// Función para inicializar el DataTable
function inicializarTabla() {
  const tabla = document.getElementById('tablaTareas');
  const dataTable = new DataTable(tabla, {
    columns: [
      { title: "ID", data: "id" },
      { title: "Nombre", data: "nombre" },
      { title: "Descripción", data: "descripcion" },
      {
        data: "id",
        render: function(data, type, row) {
          return `<td><button type="button" onClick="mostrarEnModal(${data})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${data}">Editar</button></td>`;
        }
      },
      {
        data: "id",
        render: function(data, type, row) {
          return `<td><button type="button" onClick="eliminar(${data})" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" id="${data}">Eliminar</button></td>`;
        }
      }
    ],
  });
  return dataTable;
}

// Función para cargar los datos desde la base de datos
function cargarDatos() {
  const url = "../../controller/tareas.php?opcion=listar";
  const ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const datos = JSON.parse(this.responseText);
      dataTable.clear().rows.add(datos).draw();
    }
  };
  ajax.open("GET", url, true);
  ajax.send();
}

// Llamamos a la función para inicializar el DataTable
const dataTable = inicializarTabla();

// Llamamos a la función para cargar los datos desde la base de datos
cargarDatos();

/********************/

let fromModal = document.getElementById("formularioModal");
function actualizar() {
  const ajax = new XMLHttpRequest();
  ajax.open("POST", "../../controller/tareas.php?opcion=actualizar", true);
  const data = new FormData(fromModal);
  ajax.onload = function () {
    console.log(ajax.responseText);
  };
  ajax.send(data);
}


function eliminar(id) {
  console.log(id);
  swal
    .fire({
      title: "CRUD",
      text: "Desea Eliminar el Registro?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        const ajax = new XMLHttpRequest();
        ajax.open("POST", "../../controller/tareas.php?opcion=eliminar", true);
        const data = new FormData();
        data.append("id", id);
        ajax.onload = function () {
          console.log(ajax.responseText);
          //cargarTabla();
          //listarTareas();
          cargarDatos();
          swal.fire(
            "Eliminado!",
            "El registro se elimino correctamente.",
            "success"
          );
        };
        console.log("id=" + id);
        ajax.send(data);
      }
    });
}

function guardarTarea(e) {
  e.preventDefault();
  var data = new FormData(formulario);
  const ajax = new XMLHttpRequest();
  ajax.open("POST", "../../controller/tareas.php?opcion=guardar", true);
  ajax.onload = function () {
    console.log(ajax.responseText);
    cargarDatos();
    swal.fire("Registrado!", "Registrado correctamente.", "success");
  };
  formulario.reset();
  ajax.send(data);
}

const modal = document.getElementById("exampleModal");

function actualizar(id) {
  const nombreInput = modal.querySelector("#nombre");
  const descripcionInput = modal.querySelector("#descripcion");

  // Obtener los valores actualizados desde los elementos del modal
  const nombre = nombreInput.value;
  const descripcion = descripcionInput.value;

  swal
    .fire({
      title: "CRUD",
      text: "Desea actualizar el registro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        const ajax = new XMLHttpRequest();
        ajax.open(
          "POST",
          "../../controller/tareas.php?opcion=actualizar",
          true
        );
        const data = new FormData();
        data.append("id", id);
        data.append("nombre", nombre);
        data.append("descripcion", descripcion);
        ajax.onload = function () {
          console.log(ajax.responseText);
          cargarDatos();
          swal.fire(
            "Actualizado!",
            "El registro se actualizó correctamente.",
            "success"
          );
          // cerrar el modal después de actualizar
          modal.classList.remove("show");
          modal.setAttribute("aria-hidden", "true");
          modal.setAttribute("style", "display: none");
          document.body.classList.remove("modal-open");
          document.body.removeAttribute("style");
          document.querySelector(".modal-backdrop").remove();
        };
        ajax.send(data);
      }
    });
}

function mostrarEnModal(id) {
  console.log(id);
  const ajax = new XMLHttpRequest();
  ajax.open("POST", "../../controller/tareas.php?opcion=mostrar", true);
  const data = new FormData();
  data.append("id", id);
  ajax.onload = function () {
    let respuesta = ajax.responseText;
    let datos = JSON.parse(respuesta);
    console.log(respuesta);
    document.getElementById("nombre").value = datos.nombre;
    document.getElementById("descripcion").value = datos.descripcion;
    var btnEditar = document.getElementById("btnEditarModal");
    btnEditar.removeEventListener("click", actualizar); // Eliminar el event listener anterior, si es que existe
    btnEditar.addEventListener("click", function () {
      actualizar(id);
    });
  };
  ajax.send(data);
}

init();
