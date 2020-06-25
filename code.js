
//creacion de un objeto llamado producto para procesar todo en base a este 
class producto{
    //se crea un cosntructor para inicializar las variables que tiene el objeto 
    constructor(nombre,precio,año){
        //variables que siempre tendra un objeto al ser creado 
        this.nombre = nombre;
        this.precio = precio;
        this.año = año;
    }
}

//esta clase contiene todos los metodos a utilizar en la interfaz con el usuario
class interfaz {
    agregarProducto(producto){

        // espacio donde se pondra cada producto en el DOM
       const listaProductos = document.getElementById('lista-productos');

       //se crea un div por medio de javasCript este contendra el espacio donde ira el producto 
       const espacio = document.createElement('div');
       //codigo html por medio de javascript que se encarga de mostrar el producto con sus respectivos atributos por pantalla 
       espacio.innerHTML = `
       <div class="card text-center p-3 mb-4">
            <div class"card-body">
                <strong class="m-2">Producto: </strong> ${producto.nombre}
                <strong class="m-2">Precio: </strong> ${producto.precio}
                <strong class="m-2">Año de creacion: </strong> ${producto.año}
                <a name="eliminar" href="#" class="btn btn-danger ml-4">Eliminar</a>
            </div>
       </div> 
       `;
       //agregamos ese codigo html al espacio donde van cada uno de los productos 
       listaProductos.appendChild(espacio);
       this.resetearFormulario();
    }

    //metodo que permite reiniciar el formulario y poder ingresar mas datos 
    resetearFormulario(){
        document.getElementById('formulario').reset();
    }

    //se le manda por parametro una propiedad que permite saber donde estas parado en el html 
    borrarProducto(elemento){
        //verificacion si esa propiedad tiene el name de eliminar(pertenece al boton) y si es asi procede a eliminar 
        if(elemento.name === 'eliminar'){
            //logramos acceder completamente al div que contiene todo el producto y se elimina con el metodo remove 
            elemento.parentElement.parentElement.parentElement.remove();
            this.mostrarMensaje('producto eliminado correctamente', 'danger')
        } 
    }

    //metodo que recibe por parametro el mensaje a mostrar y el estilo a aplicar en dicho mensaje 
    mostrarMensaje(mensaje, cssClass){
        //creo un div en el documento 
        const div = document.createElement('div');
        //le asigno una clase a ese div 
        div.className = `alert alert-${cssClass}`;
        //se crea el mensaje y se le asigna lo que viene por parametro 
        div.appendChild(document.createTextNode(mensaje));

        //mostrarlo en pantalla 
        //selecciono el contenedor donde ira el alerta 
        const contenedor = document.querySelector('.container');
        //selecciono la parte donde esta toda la aplicacion
        const aplicacion = document.querySelector('#aplicacion');

        //se inserta este alerta despues del contenedor y antes del id aplicacion
        contenedor.insertBefore(div,aplicacion);

        //este metodo permite mostrar un mensaje por un determinado tiempo (1 segundo)
        setTimeout(function(){
            //selecciono el alerta y lo remuevo
            document.querySelector('.alert').remove();
        },1000)
    }
}

//funcion que permite hacer accion al momento de acceder al evento submit del boton formulario
document.getElementById('formulario').addEventListener('submit', function(e){
    //no permite recargar la pagina 
    e.preventDefault();

    //accedo al valor de cada uno de los inputs que estan en el formulario
   let nombre =  document.getElementById('nombre').value;
   let precio =  document.getElementById('precio').value;
   let año =  document.getElementById('año').value;

   //se instancia un producto y se le manda por parametro los valores de los inputs 
   const Producto = new producto(nombre,precio,año);

   //se crean una interfaz para acceder a cada uno de sus metodos 
   const ui = new interfaz();

   //agrego el producto que se creo anteriormente 
   ui.agregarProducto(Producto);
   ui.mostrarMensaje('producto agregado correctamente','success');
});

//funcion que permite eliminar el producto al momento de darle click a su respectivo boton 
document.getElementById('lista-productos').addEventListener('click', function(e){
          const ui = new interfaz();
          ui.borrarProducto(e.target);
});