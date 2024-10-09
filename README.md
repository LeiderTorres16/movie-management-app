# Movie Manager Prueba Tecnica

Este proyecto es un panel de películas que utiliza la API de TMDB (The Movie Database) para mostrar una lista de películas, permitir búsquedas, filtrar resultados por idioma, región y año, ademas de crear listas y añadir peliculas a esta.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:

   git clone https://github.com/LeiderTorres16/movie-management-app.git
   cd movie-management-app

2. Instala las dependencias:
    npm install

3. Configura las credenciales de TMDB:
    Para poder usar la aplicacion, se requiere de una API KEY, esta debe ser adquirida por cada usuario que quiera usar la aplicaciom, este proceso se hace desde la pagina web de TMDB: https://developer.themoviedb.org/docs/getting-started , se debe hacer un registro para poder acceder a la API, y luego de esto se podra obtener la API KEY para usar la aplicacion.

    Con la API KEY obtenida, se debera ir al archivo .env que se encuntra en la raiz del proyecto, aqui se debera declarar la variable global de la API con la API KEY que se obtuvo, luego de esto, la aplicacion quedara lista para poder ser usada.
    
4. Ejecutar el proyecto
    Como ultimo paso solo queda ejecutar el proyecto con npm start.
    Esto abrirá el proyecto en http://localhost:3000 en tu navegador.