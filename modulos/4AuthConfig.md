# Autenticación de API y Configuración de Dominio

El siguiente paso es dar accesos a API a los usuarios. Para esto se van a generar un archivo llamado routes.json en la carpeta de public para asignar los soles de acceso.  El primer paso es generar en VScode el archivo routes.json.

![Comando generar Vue App](/media/image91.png)

Se agrega la siguiente información en el archivo. En el archivo hay que ver que roles se dan acceso. Los roles existentes en el ambiente son:
*	anonymous
*	authenticated
Contenido del archivo routes.json:
```
{
    "routes": [
      {
        "route": "/api/*",
        "allowedRoles": ["autorizado"]
      },
      {
        "route": "/*",
        "serve": "/index.html",
        "statusCode": 200
      }
    ],
    "platformErrorOverrides": [
      {
        "errorType": "NotFound",
        "serve": "/404.html"
      }
    ]
  }
  ```

El siguiente paso es invitar usuarios donde se genera el rol. Para eso vamos al sitio en Azure de la SWA.

![Comando generar Vue App](/media/image92.png)

Damos Invite y nos muestra el formulario:

![Comando generar Vue App](/media/image93.png)

Al concluir el formulario se da una liga para que el invitado obtenga los permisos necesarios.

![](/media/image94.png)
 
Al acudir al sitio de la liga pedirá el consentimiento para el sitio: 

![](/media/image95.png)

Se da el consentimiento y se obtiene acceso con el rol. 

![](/media/image96.png)

Se publica el sitio para validar el acceso, se valida con un navegador en modo incognito y se valida que ya no tenemos acceso.

![](/media/image97.png)
 
Pero ya con una cuenta autenticada por medio de la invitación continua funcionando.

![](/media/image98.png)

Se agregará ahora la liga de autenticación en la vista para el acceso. En este proceso aprovecharemos para generar un ambiente de prueba del sitio. El primer paso es abrir en VScode el archivo Lista.vue.

![](/media/image99.png)

Se agregará el siguiente código antes de la lista de consulta:
```
    <div class="user" v-if="userInfo">
      <p>Usuario</p>
      <p>{{ userInfo.userDetails }}</p>
      <p>{{ userInfo.identityProvider }}</p>
    </div>
    <div class="login" v-if="!userInfo">
      <a href="/.auth/login/aad">Login</a>
    </div>  
    <hr/>
```

También se agregará en el script el siguiente código que obtiene el usuario autenticado:

```
try {
           axios
          .get('.auth/me')
          .then(res=>{
            this.userInfo=res.data.clientPrincipal;
            console.log(this.userInfo);
        })
        } catch (error) {
          console.error('No profile could be found');
        }
```

Quedando el archivo de la siguiente forma:

![](/media/image100.png)

OPCIONAL: Ver el path autenticado del usuario con permisos. Se ve en el código que se llama a una ruta .auth/me este path cuenta con la información del usuario invitado.

![](/media/image101.png)

Ya teniendo los cambios vamos a generar una nueva rama para el ambiente. En VScode vamos a dar clic en source code en donde marca el Branch master.

![](/media/image102.png)

Nos muestra la opción en comando de generar un Branch. Seleccionaremos un nuevo branch

![](/media/image103.png)

Se asignará un nombre.

![](/media/image104.png)

Y se subirá al ambiente de Github con el cambio.
 
 ![](/media/image105.png)
 ![](/media/image106.png)
 ![](/media/image107.png)
 
Al concluir el proceso de CI/CD se genero un sitio de staging en el portal de Azure.

![](/media/image108.png)
 
Se pueden validar el cambio y manteniendo el sitio original (master).

![](/media/image109.png)
 
Nueva rama de código con el cambio.

![](/media/image110.png)
 
Se valida el proceso de login.

![](/media/image111.png)
 
Y se puede validar el usuario autenticado.

![](/media/image112.png)
 
OPCIONAL- Validar la configuración. En la pagina de Azure en configuraciones se agrego un nuevo ambiente que permite generar variables independientes para pruebas:

![](/media/image113.png)
 
Habiendo validado nuestro cambio podemos hacer el merge al Branch original. Vamos a Pull request

![](/media/image114.png)
 
Y se ejecuta el merge

![](/media/image115.png)
 
Se confirma el merge.

![](/media/image116.png)
 
Se tiene ya un Branch master 
 
 ![](/media/image117.png)
 
Y se espera a ejecutar el CI/CD.

![](/media/image118.png)
 
Al concluir validamos que el cambio este en el ambiente principal.
 
 ![](/media/image119.png)

Para el agregar un dominio se ingresa a la opción de custom domain en el portal de Azure. 

![](/media/image120.png)
 
Se da agregar y llenamos el formulario.

![](/media/image121.png)
 
Se va al manejador de dominio y se realizaran los cambios de `CNAME`

![](/media/image122.png)
 
El cambio del `CNAME` toma un tiempo entre 24 y 48 hrs.
Por último, hay que configurar el Application Insights que permitirá monitorear la aplicación y poder ver los logs que se han escrito por parte de las API. El primer paso es generar un Log Analytics que requiere Application Insights.

![](/media/image123.png)
 
Se agrega el recurso.

![](/media/image124.png)
 
Se espera el despliegue.

![](/media/image125.png)
 
Se concluye el despliegue
 
 ![](/media/image126.png)
 
Lo segundo que se requiere es generar un componente de Application Insights.
 
![](/media/image127.png)

Se agrega un nuevo recurso

![](/media/image128.png)

Se llena el formulario, referenciando el Log Analytics que se configuro anteriormente.
 
 ![](/media/image129.png)
 
Se valida y se crea.

![](/media/image130.png)
 
Se termina la generación del Application Insights

![](/media/image131.png)

Entramos al recurso. Y se copia el Instrumentation Key.

![](/media/image132.png)

Se entra a la aplicación SWA generada. Se agrega un nuevo setting llamado `APPINSIGHTS_INSTRUMENTATIONKEY` con el valor obtenido del Application Insights.

![](/media/image133.png)

Se da Salvar.

![](/media/image134.png)

Se ingresa a Application Insights y se pueden revisar la información del SWA.

![](/media/image135.png)
![](/media/image136.png)
![](/media/image137.png)
