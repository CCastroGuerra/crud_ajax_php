<?php 
require_once("../config/conexion.php");
require_once("../model/Tarea.php");

$tarea = new Tarea();

switch($_GET["opcion"]){
    case "listar":
    $tarea-> traerTareas();
    break;

    case "guardar":
        // $datos = $tarea->traerTareasXId($_POST["id"]);
        // if(empty($_POST["id"])){
        //     if(is_array($datos)==true && count($datos)==0){
        //         $tarea ->registrarTarea($_POST["nombre"],$_POST["descripcion"]);
        //     }
        // }else{
        //     $tarea-> actualizarTarea($_POST["id"],$_POST["nombre"],$_POST["descripcion"]);
        // }
        $tarea ->registrarTarea($_POST["nombre"],$_POST["descripcion"]);
        break;
    case "mostrar":
        $datos = $tarea->traerTareasXId($_POST["id"]);
        if(is_array($datos)==true && count($datos)==0){
            foreach($datos as $row){
                $output['id'] = $row['id'];
                $output['nombre'] = $row['nombre'];
                $output['descripcion'] = $row['descripcion'];
            }
        }
        break;
    case "eliminar":
            $tarea-> eliminarTarea($_POST["id"]);
            break;
}

?>