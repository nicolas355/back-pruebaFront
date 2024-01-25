# Prerequisitos

- Node >= 18

# Preparando entorno de desarrollo

### Instalar dependencias

`npm install`

Crear un archivo `.env` y pegar las variables que se encuentran en `.env.template` (Solo se puede cambiar el valor de `PORT` si se desea)


### Generar las migraciones

`npm run migration:dev`

### Crear carpetas para guardar los archivos

En la raíz del proyecto se deben crear dos carpetas `images` y `pdf`.

### Levantar el servidor

`npm run dev`

## Endpoints

### Users
GET y POST `/api/prueba/users`

- Post user recibe `nombre`(string), `apellido`(string), `numero`(number) y `fecha`(date)

GET by id `/api/prueba/users/:id`

### Images
POST y GET  `/api/prueba/image`

- Post image recibe `titulo`(string) y el archivo imagen

GET by Name  `/api/prueba/image/name/:name`

GET by Id  `/api/prueba/image/:id`

### Pdf
GET y POST `/api/prueba/pdf`

- Post pdf recibe `titulo`(string) y el archivo pdf

GET by Name  `/api/prueba/pdf/name/:name`

GET by Id  `/api/prueba/pdf/:id`

