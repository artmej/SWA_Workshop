# Static Web App con consumo de Cosmos DB

Static Web Apps es un flujo de trabajo con CI/CD que permite contar con aplicaciones estáticas y API en una arquitectura serveless. Sin olvidar los beneficios de hospedaje, distribuido globalmente, SSL gratuitos, entre otras.

![Proceso de SWA](/media/image1.png)

El objetivo del Workshop es brindar las bases para generar una aplicación SWA que tenga un Front-End, API y base de datos y mostrar el ciclo de vida de la aplicación con Github Actions. El diseño lógico que se busca en el workshop es el siguiente:

![Arquitectura](/media/image1a.png)

El workshop esta dividido en los siguientes módulos, se veran como carpetas en el repositorio:
* [Generar una app con Vue e integración de Github](/modulos/1GeneraAppVue.md)
* [Generar un API](/modulos/2GeneraAPI.md)
* [Integrar una consulta con Cosmos DB y configuración de ambiente](/modulos/3AddCosmosDB.md)
* [Autenticación de API y Configuración de Dominio](/modulos/4AuthConfig.md)

[Codigo final](/modulos/codigo_final/)

### Requerimientos

* [Cuenta de Github](https://github.com/)
* [Cuenta de Azure](https://portal.azure.com)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Azure Static Web Apps extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)
* [Node.js](https://nodejs.org/)
* [Vue.js](https://vuejs.org/v2/guide/installation.html)


### Ligas
* [Liga de Static Web Apps en Azure](https://azure.microsoft.com/en-us/services/app-service/static/)
* [Docs](https://docs.microsoft.com/es-es/azure/static-web-apps/overview)
* [Limites](https://docs.microsoft.com/es-es/azure/static-web-apps/quotas)
* [Extensión de VSCode](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)
* [Ejemplo con varios frameworks](https://github.com/johnpapa/shopathome)
