//console.log('hola');
//buscar();
guardar();

var form = document.getElementById('formulario');
var respuesta = document.getElementById('mensaje');

// form.onsubmit = function (e) {
//     var nombre = document.getElementById("nombre").value;
//     var descripcion = document.getElementById("descripcion").value;
//     e.preventDefault();
//     // console.log(nombre);
//     if (nombre.length > 0 && descripcion.length > 0) {
//       guardar();
//     } else {
//       mensaje = "Completa los campos";
//       respuesta.innerHTML = `
//       <div class="alert alert-danger" role="alert id="alerta"">
//       ${mensaje}
//       </div
//           `;
//     }
//   };

function buscar(){
   const ajax = new XMLHttpRequest();
   ajax.open('POST', 'servidor.php',true);
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
            </tr>
            `;
        }
    }else{
        console.log('error');
    }
   }
   ajax.send(data);
   
}
function guardar(){
  var mensaje = "";
 
  const ajax = new XMLHttpRequest;
  ajax.open('POST','servidor.php',true);
  var data = new FormData(form);
  data.append("accion", "guardar");
  ajax.onload = function(){
        var realizado = ajax.responseText;
        console.log(realizado);
        if(realizado * 1 > 0){
            mensaje =  'Ser registro correctamente'
            respuesta.innerHTML = `
            <p id="mensaje">${mensaje}</p>
            `;
            
        }else{
        mensaje =  'Error al registrar'
        respuesta.innerHTML = `
        <p id="mensaje">${mensaje}</p>
        `;
        }
        buscar();
        form.reset();
    }
    ajax.send(data);
}
