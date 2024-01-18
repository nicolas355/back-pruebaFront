# Prerequisitos

- Node >= 18
- docker 
    - windows (Tiene que estar corriendo Docker desktop)
    - Linux (Iniciar el demonio de docker usando `systemctl start docker.service`)

# Preparando entorno de desarrollo

### Instalar dependencias

`npm install`
Crear un archivo `.env` y pegar las variables que se encuentran en `.env.template` (Solo se puede cambiar el valor de `PORT` si se desea)


### Levantar los contenedores de docker
`docker compose up`

Entrando a `http://localhost:8080` estara levantado pdAdmin para poder ver las tablas de la base de datos a usar.

### Generar las migraciones

`npm run migration:dev`

### Crear carpetas para guardar los archivos

En la raiz del proyecto se deben crear dos carpetas `images` y `pdf`.

### Levantar el servidor

`npm run dev`
