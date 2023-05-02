<?php
 class Tarea extends Conectar{
    public function traerTareas(){
        $conectar = parent::conexion();
        $sql = "SELECT * FROM tarea WHERE est =1";
        $sql = $conectar ->prepare($sql);
        $sql->execute();
        $resultado = $sql->fetchAll();
        if(empty($resultado)){
            $resultado = array('listado'=>'vacio');
            $jsonString = json_encode($resultado);
            echo $jsonString;
         }else{
             $json =array();
             $listado = array();
             foreach($resultado as $row) {
                 $listado[]=array(
                     'id' => $row['id'],
                     'nombre' => $row['nombre'],
                     'descripcion' => $row['descripcion']
                 );
             }
             $jsonString = json_encode($listado);
             echo $jsonString;
         
         }
    }
    public function traerTareasXId($id){
        $conectar = parent::conexion();
        $sql = "SELECT * FROM tarea WHERE id = ?";
        $sql = $conectar ->prepare($sql);
        $sql -> bindValue(1, $id);
        $sql->execute();
        return $resultado = $sql->fetchAll();
    }
    public function eliminarTarea($id){
            if (isset($_POST["id"])) {
                $id = $_POST["id"];
                // Resto del código para eliminar la tarea
                $conectar = parent::conexion();
                $sql = "UPDATE tarea SET est = 0, fecha_elim=now() WHERE id = ?";
                $sql = $conectar ->prepare($sql);
                $sql -> bindValue(1, $id);
                $sql->execute();
                return $resultado = $sql->fetchAll();
            } else {
                echo "El parámetro 'id' no ha sido enviado";
            }
     }
        
        
       
    
    public function registrarTarea($nombre,$descripcion){
        $conectar = parent::conexion();
        $sql = "INSERT INTO `tarea`(`id`, `nombre`, `descripcion`, `fecha_crea`, `fecha_modi`, `fecha_elim`, `est`) VALUES (NULL,'?','?',now(),'','',1)";
        $sql = $conectar ->prepare($sql);
        $sql -> bindValue(1, $nombre);
        $sql -> bindValue(2, $descripcion);
        $sql->execute();
        return $resultado = $sql->fetchAll();
    }
    public function actualizarTarea($id,$nombre,$descripcion){
        $conectar = parent::conexion();
        $sql = "UPDATE tarea SET nombre = ?,descripcion = ?, fech_modi=now() WHERE id = ?";
        $sql = $conectar ->prepare($sql);
        $sql -> bindValue(1, $nombre);
        $sql -> bindValue(2, $descripcion);
        $sql -> bindValue(3, $id);
        $sql->execute();
        return $resultado = $sql->fetchAll();
    }
 }

?>