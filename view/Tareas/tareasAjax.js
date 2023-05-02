var tabla;

function init(){

}
document.addEventListener("DOMContentLoaded",function(){
        const ajax = new XMLHttpRequest();
        ajax.open('POST', '../../controller/tareas.php?opcion=listar',true);
        var data = new FormData();
        data.append('accion','buscar');
        ajax.onload = function(){
         let respuesta = ajax.responseText;
         console.log(respuesta);
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
        ajax.send(data);       
    
});
   


init();