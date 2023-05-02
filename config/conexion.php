<?php
 class Conectar {
    protected $host;

    protected function Conexion(){
        try {
         $conectar = $this->host = new PDO("mysql:local=localhost;dbname=bd_tareas","root","");
         return $conectar;
        } catch (Exception $e) {
            print "¡Error BD!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
 }
?>