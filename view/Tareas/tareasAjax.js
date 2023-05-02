var tabla;

function init(){
listarTareas();
}
function listarTareas(){
        const ajax = new XMLHttpRequest();
        ajax.open('POST', '../../controller/tareas.php?opcion=listar',true);
        ajax.onload = function(){
         let respuesta = ajax.responseText;
         //console.log(respuesta);
         const data = JSON.parse(respuesta);
         //console.log(data);
         var tabla = document.getElementById('tabla');
         tabla.innerHTML = '';
         if(data.length > 0){
             for(let valor of data){
                 tabla.innerHTML += `
                 <tr>
                 <td>${valor.id}</td>
                 <td>${valor.nombre}</td>
                 <td>${valor.descripcion}</td>
                 <td><button type="button" onClick = "editar(${valor.id})"  class="btn btn-info" data-coreui-toggle="modal" data-coreui-target="#exampleModal" id = "${valor.id}">Editar</button></td>
                 <td><button type="button" onClick = "eliminar(${valor.id})"  class="btn btn-danger" data-coreui-toggle="modal" data-coreui-target="#exampleModal" id = "${valor.id}">Eliminar</button></td>
               
                 `;
             }
         }else{
             console.log('error');
         }
        }
        ajax.send();       
    
}
   
function editar(id){
    console.log(id);

}

function eliminar(id){
    console.log(id);
    swal.fire({
        title: 'CRUD',
        text: "Desea Eliminar el Registro?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const ajax = new XMLHttpRequest;
            ajax.open('POST','../../controller/tareas.php?opcion=eliminar',true);
            const data = new FormData();
            data.append('id',id);
            ajax.onload = function() {
                console.log(ajax.responseText);
                listarTareas();
                swal.fire(
                    'Eliminado!',
                    'El registro se elimino correctamente.',
                    'success'
                )
            };
            console.log("id=" + id);
            ajax.send(data);
        }
    });    
 }          


init();