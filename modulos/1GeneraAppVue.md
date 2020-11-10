# Generar una app con Vue e integración de Github

Se abre un terminal (Powershell) y se genera la aplicación inicial de VUE con el siguiente comando:

`vue create staticapp`

![Comando generar Vue App](/media/image2.png)

Se selecciona la opción default:

![Comando generar Vue App](/media/image3.png)

Se concluye la creación del app

![Comando generar Vue App](/media/image4.png)

Ubicamos en la carpeta de la aplicación:
`cd staticapp`

![Comando generar Vue App](/media/image5.png)

* * *
##### OPCIONAL: Probar la aplicación por medio del siguiente comando:
`npm run serve`

 ![Comando generar Vue App](/media/image6.png)
 
Y se valida que la aplicación funcione correctamente:

![Comando generar Vue App](/media/image7.png)

Se detiene la ejecución por medio de CTRL+C.

![Comando generar Vue App](/media/image8.png)
* * *

Iniciamos vscode para continuar con el desarrollo:
`code .`
 
![Comando generar Vue App](/media/image9.png)

Nos muestra Vscode con la carpeta:

![Comando generar Vue App](/media/image10.png)

Ingresamos a la opción de Source control:

![Comando generar Vue App](/media/image11.png)

Se habilita la vista de Source Control Repositories:
 
![Comando generar Vue App](/media/image12.png)

Muestra la opción de publicar a Git 

![Comando generar Vue App](/media/image13.png)

Se da clic a publicar. En caso de no estar autenticado pedirá ligar el acceso a Github.

![Comando generar Vue App](/media/image14.png)

Nos muestra la selección de que el repositorio sea público o privado. En mi caso será privado.

![Comando generar Vue App](/media/image15.png)

En este momento inicia la carga de la aplicación a un repositorio, si esta todo correcto nos indica que concluyo:

![Comando generar Vue App](/media/image16.png)

Se puede ver el repositorio con los archivos cargados en la Branch master:

![Comando generar Vue App](/media/image17.png)

* * *
Paso 2. Publicar el static web app. Para iniciar entramos al portal de azure
`Portal.azure.com`

![Comando generar Vue App](/media/image18.png)

Buscamos “Static Web apps”

![Comando generar Vue App](/media/image19.png) 

Agregamos una nueva App.

![Comando generar Vue App](/media/image20.png)

Mostrará la siguiente interfaz para dar acceso a los repositorios. Se da clic al botón de Github para dar acceso al repositorio.

![Comando generar Vue App](/media/image21.png)

Se muestra la siguiente interfaz y se acepta el acceso

![Comando generar Vue App](/media/image22.png)

A completamos el formulario, generando un nuevo grupo de recursos:

![Comando generar Vue App](/media/image23.png)
 
Se termina de llenar el formulario:
 
 
![Comando generar Vue App](/media/image24.png)
 
Opciones en el formulario:
| Campo | Valor |
| --- | --- |
| Name | staticapp |
| Region  | East US 2 |
| SKU | Free |
| GitHub account | usr |
| Build Details | Vue.js |
| App location | /  |
| Api location  | api |
| App artifact | dist |

Se pueden agregar tag en caso de ser necesario. En caso contrario se puede ir directo a Revisar y generar:
 
 
![Comando generar Vue App](/media/image25.png)

Al concluir nos da acceso al recurso:

![Comando generar Vue App](/media/image26.png)

Se ingresa al recurso y nos muestra la siguiente interfaz.

![Comando generar Vue App](/media/image27.png)

Se da clic a `Git Action runs`

![Comando generar Vue App](/media/image28.png)

Entramos al ultimo resultado para ver el proceso.

![Comando generar Vue App](/media/image29.png)

Vemos el detalle:

![Comando generar Vue App](/media/image30.png)

Regresamos a la pantalla de la SWA.

![Comando generar Vue App](/media/image31.png)

Donde vemos la URL publicada que debe verse la aplicación de Vue generada.

![Comando generar Vue App](/media/image32.png)

Con esto ya tenemos una aplicación con CI/CD publicada con https y con control de versionamiento.

Paso 3. Realizar un cambio y publicarlo.
Se regresa a Vscode para realizar un cambio. Nos dirigimos a los archivos:

![Comando generar Vue App](/media/image33.png)

Se va a generar un nuevo archivo de vista (.vue) dentro de la carpeta `./src/components/` llamado `Lista.vue` con el siguiente contenido:
```
<template>
        <div class="container">
                <h2>Lista</h2>
        </div>
</template>
<style>
h2
{
    margin-bottom: 5%;
}
</style>
```

Viéndose de la siguiente manera: 

![Comando generar Vue App](/media/image34.png)

Y en el archivo App.vue Se cambiara en 3 puntos a que use el nuevo componente “Lista” en template , al inicio de script y en export:

![Comando generar Vue App](/media/image35.png)

Se salvan los cambios, y se va a source control:

![Comando generar Vue App](/media/image36.png)

Se sigue el mismo procedimiento de Commit:

![Comando generar Vue App](/media/image37.png)
 
Se agrega una descripción del commit:

![Comando generar Vue App](/media/image38.png)

Y se sincronizan los cambios:

![Comando generar Vue App](/media/image39.png)

Se da OK

![Comando generar Vue App](/media/image40.png)

Y se puede ir a Github actions para ver el resultado de CI/CD:

![Comando generar Vue App](/media/image41.png)
 
Se espera a que concluya el proceso:

![Comando generar Vue App](/media/image42.png)

Y vemos la url para ver los cambios:

![Comando generar Vue App](/media/image43.png)

Con esto ya se puede generar contenido publicado y con un ciclo de vida en CI/CD. El siguiente paso es generar API para comunicación.
