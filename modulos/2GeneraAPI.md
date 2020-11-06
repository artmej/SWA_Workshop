# Generar un API

En este módulo se construye un API y publicación del mismo en Azure. El API se construye en base al mismo funcionamiento de Azure Functions dentro del Static Web App. El primer paso es ir a VScode y hacer uso de la extensión de Azure para Static Web Apps.

![Comando generar Vue App](/media/image44.png)

Se da clic en el icono de add function

![Comando generar Vue App](/media/image45.png)

Da opción de seleccionar lenguaje de programación. Se usará Javascript. Adicional pregunta el nombre de la función.
 
![Comando generar Vue App](/media/image46.png)

Esto genera en la estructura un folder API con la estructura de function.

![Comando generar Vue App](/media/image47.png)
 
En function.js nos da el comportamiento del function, niel de autenticación y métodos soportados.
 
![Comando generar Vue App](/media/image48.png)
 
Index.js contiene la codificación del function.
  
![Comando generar Vue App](/media/image49.png)
 
En caso de function.js podemos ayudar a contener algún comportamiento, como es el contar con un alias para nuestro API. En Function.js se agregará la siguiente línea al json:

```
"route": "lista"
```

Quedando de la siguiente manera el archivo:
 
![Comando generar Vue App](/media/image50.png)
  
Si contamos con las extensiones de vscode para functions, se puede iniciar la función. Dando run en vscode. 
 
![Comando generar Vue App](/media/image51.png)
 
Lo que hace este run es correr el comando “func host start”. Se ve en la pantalla que se tiene funcionando el servicio y nos da la ruta del api.
 
![Comando generar Vue App](/media/image52.png)
 
Se puede pasar un parámetro en el Function default llamado name.
 
![Comando generar Vue App](/media/image53.png)
 
Se realiza el commit, publish y esperamos que Github actions termine.
Commit: 

![Comando generar Vue App](/media/image54.png)
 
Publish:   

![Comando generar Vue App](/media/image55.png)
 
Github Actions:  

![Comando generar Vue App](/media/image56.png)
 
Al concluir contamos con un Function funcionando en la aplicación:
 
![Comando generar Vue App](/media/image57.png)
 
Como siguiente paso se cambiara el API para contar con información e integrarlo a la vista. Primero es generar un arreglo de objetos en el servicio y regresar como respuesta este arreglo. En un paso posterior se cambiara este arreglo por una respuesta de CosmosDB. La function queda de la siguiente manera:

![Comando generar Vue App](/media/image58.png)
 
Este es el codigo que se agrego:
```
const data =[
    {
      id: 10,
      nombre: 'Objeto 1'
    },
    {
      id: 20,
      nombre: 'Objeto 2'
    },
    {
      id: 30,
      nombre: 'Objeto 3'
    },
  ];

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.res.status(200).json(data);
}
```

Se prueba localmente y posteriormente se hace Commit a la Static App. 

![Comando generar Vue App](/media/image59.png)
 
Contado con información que nos brinda el API. Se puede modificar el Front end para mostrar los datos.Vamos a la parte de la carpeta para integrar la vista con el API. Como primer paso la vista requiere un modulo para consumir el API, el modulo a usar es “axios”. Para usar este modulo se va a instalar. Para integrarlo a la solución y configurar se inicia una terminal, se pone al nivel del forlder principal y se ejecuta el siguietne comando:

![Comando generar Vue App](/media/image60.png)
 
Se concluye y se vera de la siguiente forma:

![Comando generar Vue App](/media/image61.png)
  
Se puede validar la configuración del paquete en pacjkage.json y package-lock.json.

![Comando generar Vue App](/media/image62.png)

![Comando generar Vue App](/media/image63.png)
 
En Lista.vue modificar el template con la siguiente tabla que sirva para mostrar los resultados:

```
                <table>
                    <thead> 
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dato in lista" v-bind:key="dato.id">
                            <th scope="row">{{dato.id}}</th>
                            <th scope="row">{{dato.nombre}}</th>
                        </tr>
                    </tbody>
                </table>
        </div>

```

Tambien se agregará la sección de script que se usar axios para obtner el resultado del API. Se agrega este script.

```
<script>
import axios from 'axios';
export default {
    name: 'Lista',
    data() {
        return{
            lista: null,
        };
    },
created: function(){
      try {
          axios
        .get('api/lista')
        .then(res=>{
            this.lista=res.data;
        })
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    }
}
</script>
```

Quedando el archivo completo de la siguiente manera:

![Comando generar Vue App](/media/image64.png)
 
Se publica y se valida la integración con el API por medio de la UX.
 
![Comando generar Vue App](/media/image65.png)
 
La aplicación al momento ya cuenta con modulos de Front end e integración con backend en la misma Static Web App. El siguiente paso es integrarlo con la base de datos en Cosmos DB.

 
