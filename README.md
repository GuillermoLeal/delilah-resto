# Delilah Restó

template API simple para pedidos de comida deliciosa. Como cliente, podrás registrarte, ver el listado de nuestros productos y realizar una orden. Los administradores del restaurante tienen la oportunidad de recibir pedidos y actualizarlos.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Tener instalado [MySQL](https://www.mysql.com/), si no lo tienes puedes descargar un paquete como [XAMPP](https://www.apachefriends.org/es/index.html), [WampServer](https://www.wampserver.com/en/) o [MAPM](https://www.mamp.info/en/windows/)_

_Tener instalado [NodeJS](https://nodejs.org/en/)_

### Instalación 🔧

_Primero crea la base de datos e importa el archivo **delilah-resto.sql** que se encuentra en la raíz del proyecto a la base de datos que creaste_

_Ejecuta el siguiente comando para instalar las dependencias del proyecto_

```
npm install
```

_Luego crea un archivo **.env** con las siquientes variables (Ejemplo de configuracion)_

```
# Nombre de usuario de la base de datos
DB_USER=your_username

# Contraseña de la base de datos
DB_PASSWORD=your_password

# Nombre de la base de datos
DB_DATABASE=delilah_resto

# Host donde corre la base de datos
DB_HOST=localhost

# Si esta en true y la base de datos se sincroniza forzadamente
entonces se borraran todos los datos
DB_FORCE=true

# Puerto donde correra la aplicacion
PORT=4000

# Secreto del JWT a utilizar, puede ser cualquier string
TOKEN_SECRET=tu_jwt_secret
```

_Ejecuta el siguiente comando para iniciar el servidor node del proyecto_

```
npm run start

- Si tienes instalado nodemon en el proyecto puedes ejecutar este otro comando:

npm run dev
```

_Deverias estar viendo en consola algo parecido al siguiente mensaje si todo está correcto:_

```
Server on port 3000!
Base de datos cargada
```

## Construido con 🛠️

_Herramientas usadas en el proyecto_

-   [NodeJS](https://nodejs.org/en/) - Lenguaje usado en el back-end
-   [NPM](https://www.npmjs.com/) - Manejador de dependencias
-   [Express](https://expressjs.com/es/) - Usado para infraestructura de la API
-   [Sequelize](https://sequelize.org/) - ORM usado para la estructura y consulta a la base de datos
-   [jsonwebtoken](https://jwt.io/) - Usado para la autenticación

## Documentacion 📖

La documentación de la API puede encontrarse en el archivo **spec.yaml** presente en el directorio raíz del repositorio., se recomienda abrir el archivo con [swagger](https://editor.swagger.io/#) para mayor claridad.
