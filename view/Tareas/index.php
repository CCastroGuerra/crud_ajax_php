<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App de tareas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div class="modal-content">
                    <form id="formularioModal">
                        <div class="modal-header">
                            <h5 class="modal-title">Edtiar Tarea</h5>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="id" name="id">
                            <div class="form-group">
                                <label class="form-label" for="nombre">Nombre</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese Nombre" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="descripcion">Descripcion</label>
                                <textarea type="text" rows="3" class="form-control" id="descripcion" name="descripcion" placeholder="Ingrese Descripcion" required></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>




<body>
    <h3 class="text-center mb-3">
        LISTA DE TAREAS
    </h3>
    <div class="container">
        <div class="row">
            <div class="col-5">
                <form method="POST" id="formulario">
                    <div class="form-group">
                        <input type="hidden" name="id" id="id">
                        <label for="my-input">Nombre</label>
                        <input id="nombre" class="form-control" type="text" name="nombre">
                        <label for="my-input">Descripcion</label>
                        <input id="descripcion" class="form-control" type="text" name="descripcion">
                        <button id="btnAgregar" type="submit" class="btn btn-primary mt-3">AGREGAR</button>
                    </div>
                </form>
            </div>
            <p id="mensaje"></p>
            <div class="col-7">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>DESCRIPCION</th>
                            <th></th>
                            <th></th>

                        </tr>
                    <tbody class="table-groud-divider" id="tabla">

                    </tbody>

                    </thead>
                </table>

            </div>
        </div>



    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="tareasAjax.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

</body>

</html>