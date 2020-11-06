# Integrar una consulta con Cosmos DB y configuración de ambiente


El primer paso es generar un Cosmos DB. En portal de Azure e integra un Cosmos DB buscando el componente y dando add.

![Comando generar Vue App](/media/image66.png)
 
Se genera con la siguiente información:

![Comando generar Vue App](/media/image67.png)
 
Todas las demás opciones se pueden dejar en los valores actuales. Se Valida y se genera:

![Comando generar Vue App](/media/image68.png)

Al concluir se ingresa al recurso y se obtiene la Se obtiene la URI
 
![Comando generar Vue App](/media/image69.png)
 
Obtenemos los keys de acceso:
 
![Comando generar Vue App](/media/image70.png)

Obtenemos la llave primaria
 
![Comando generar Vue App](/media/image71.png)

Se requieren datos de prueba para comprobar la funcionalidad. Para esto se ingresa a la opción Data Explorer y agregamos un nuevo contenedor.

![Comando generar Vue App](/media/image72.png)
 
Se pide el nombre de la base de datos donde usaremos el nombre `SWADB` y se da OK. 

![Comando generar Vue App](/media/image73.png)

Se agrega un contenedor que usaremos la base de datos generada y agregaremos el contenedor SWAList. También se hará la partición por id.

![Comando generar Vue App](/media/image74.png)

Se ingresa a la vista de Data Explorer de tamaño full que se encuentra en la esquina superior derecha.

![Comando generar Vue App](/media/image75.png)

Se selecciona la opción de ítems.

![Comando generar Vue App](/media/image76.png)
 
Se selecciona New Item y se agrega con las opciones id y nombre. 

![Comando generar Vue App](/media/image77.png)

Se registrarán los recursos como son 4 registros:
 
 ![Comando generar Vue App](/media/image78.png)
 
Volvemos a VScode y accesamos a `local.settings.json` de API para agregar las configuraciones a usar localmente.

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "DB_URL":"https://staticappws1.documents.azure.com:443/",
    "DB_SECRET":"W==",
    "DB_NAME":"SWADB",
    "DB_CONTAINER":"SWAList"
  },
  "Host": {
    "CORS": "*"
  }
}
```

Nos dirigimos a la terminal y nos ubicamos en la carpeta de API.

![Comando generar Vue App](/media/image79.png)

Se agregan las librerías de express y de cosmos con los siguientes comandos:
```
npm i express
```

![Comando generar Vue App](/media/image80.png)

```
npm i @azure/cosmos
```
![Comando generar Vue App](/media/image81.png)

El siguiente paso es modificar el servicio para que consulte la base de datos. Para hacer eso se usa el modulo de cosmos que se agrega al inicio y posteriormente se realiza conexión y ejecución al Cosmos DB.
Se cambia el servicio con el siguiente código:

```
const CosmosClient = require('@azure/cosmos').CosmosClient
module.exports = async function (context, req) {
    try {
        console.log("Inicio de dao");
        client= new CosmosClient  ({endpoint: process.env.DB_URL, key: process.env.DB_SECRET});
        dbResponse = await client.databases.createIfNotExists({id: process.env.DB_NAME});
        database = dbResponse.database;
        coResponse = await database.containers.createIfNotExists({id: process.env.DB_CONTAINER});
        container = coResponse.container
        respuesta= await container.items.readAll().fetchAll();
        console.log("Fin de dao");
        context.res.status(200).json(respuesta.resources);
      } catch (error) {
        console.log(error);
        context.res.status(500).send(error);
      }   
}
```

Quedando de la siguiente manera:

![Comando generar Vue App](/media/image82.png)

Se realiza una ejecución local para validar que ejecuta correctamente:

![Comando generar Vue App](/media/image83.png)

En caso de estar correctamente configurado nos mostrará los datos que se tienen en la base de datos:
 
 ![Comando generar Vue App](/media/image84.png)

Se replica a master en Github y se valida que compile correctamente.
 
![Comando generar Vue App](/media/image85.png)

El siguiente paso es configurar las variables que se tienen en local en el SWA. Para esto vamos al portal de azure.
 
 ![Comando generar Vue App](/media/image86.png)
 
Ingresamos a la parte de configuración: 

![Comando generar Vue App](/media/image87.png)

Y se agrega la configuración de la base de datos en la SWA. Al final se da salvar.

![Comando generar Vue App](/media/image88.png)

Esperar un par de minutos e intentar accesar el servicio:

![Comando generar Vue App](/media/image89.png)

Si funciona correctamente validar en Interfaz de usuario:

![Comando generar Vue App](/media/image90.png)
