# Grupo 11
Este proyecto está hecho con node.js, el cual se puede instalar [aquí](https://nodejs.org/en)

También, para la base de datos se está utilizando postgres, lo cual se puede utilizar [aquí](https://www.postgresql.org/download/)

Luego de terminar con la instalación de postgres, se debe importar la base de datos del proyecto, utilizando el siguiente comando en la consola de postgres (el archivo dbexport.psql está en la carpeta server): 

```psql -U username isw < dbexport.pgsql```

donde username es su nombre de usuario de postgres. Para un tutorial más detallado [ver este link](https://www.a2hosting.com/kb/developer-corner/postgresql/import-and-export-a-postgresql-database/#Exporting-a-PostgreSQL-database).

**Antes de levantar el proyecto debe poner su usuario y contraseña de postgress en el archivo db.js dentro de la carpeta server**

Para levantar el proyecto, primero **dentro de la carpeta ``server``**
correr el comando 

``npm install``

y luego dentro de la misma carpeta correr el comando:

``node index.js``

*(nota: el backend corre en el puerto 5001, así que asegurarse que no esté en uso)*

dejar esto corriendo.

En otra terminal, se debe correr el siguiente comando **dentro de la carpeta ``isw``**

``npm install``

Una vez hecho eso, dentro de la misma carpeta utilizar

``npm start``

Para enviar un mensaje, primero **hacer click en un dispositvo** y luego escribir el mensaje y apretar send. Luego al recargar la página se va a ver el mensaje.

Al hacer click en la tuerca en la esquina superior derecha, se abre la página de admin donde ahora los celulares se pueden mover a las distintas secciones

## Importante: para la parte de admin
Primero que todo, para ingresar a la aplicación ingresar los números 1, 2 o 3. Luego para ver la parte de admin, **todos los dispositivos deben comenzar en la celda de desconectados**. Luego de eso se pueden mover a donde uno quiera. 
