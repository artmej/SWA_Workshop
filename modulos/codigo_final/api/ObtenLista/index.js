
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