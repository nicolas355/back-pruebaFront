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
