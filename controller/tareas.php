<?php 
require_once("../config/conexion.php");
require_once("../model/Tarea.php");

$tarea = new Tarea();

switch($_GET["opcion"]){
    case "listar":
    $tarea-> traerTareas();
    break;
}

?>