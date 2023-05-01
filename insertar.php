<?php
include 'conexion.php';
agregar($_POST['nombre'],$_POST['descripcion']);
function agregar($nombre,$descripcion){
    global $conexion;
    $sql = "INSERT INTO `tarea`(`nombre`,`descripcion`) VALUES ('$nombre','$descripcion')";
    $fila=$conexion->prepare($sql);
    if($fila->execute()===true){
        echo '1';
    }else{
        echo '0';
    }
}


?>
