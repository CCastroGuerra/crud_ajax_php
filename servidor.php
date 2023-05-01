<?php
include 'conexion.php';
// $nombre =$_POST['nombre'];
// $descripcion = $_POST['descripcion'];
$accion = (isset($_POST['accion'])) ? $_POST['accion'] : "guardar";
switch ($accion) {
    case 'buscar':
        listar();
        break;
    case 'guardar':
        agregar($_POST['nombre'], $_POST['descripcion']);
        break;
    default:
  

        echo "Error";
        break;
}


function listar()
{
    global $conexion;
    $sqlListar = 'SELECT * FROM `tarea`';
    $sentenciaAgregar = $conexion->prepare($sqlListar);
    $sentenciaAgregar->execute();

    //fetchaLL para lee la consulta como un arreglo
    $resultado = $sentenciaAgregar->fetchAll();
    //echo $resultado;

    if (empty($resultado)) {
        $resultado = array('listado' => 'vacio');
        echo json_encode("Vacio, como tu corazon uu" . $resultado);
    } else {
        $listado = array();
        foreach ($resultado as $row) {
            $listado[] = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion'],
            );
        }
        echo json_encode($listado);
    }
}

function agregar($nombre, $descripcion)
{
    global $conexion;
    $sql = "INSERT INTO `tarea`(`nombre`,`descripcion`) VALUES ('$nombre','$descripcion')";
    $fila = $conexion->prepare($sql);
    if ($fila->execute() === true) {
        echo json_encode('1');
    } else {
        echo json_encode('0');
    }
}
