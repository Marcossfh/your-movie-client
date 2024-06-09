# Project Name Cuenta tu peli

## [See the App!](https://tus-pelis-app.netlify.app)

## Description

Crea tu Peli es una app para compartir ideas sobre proyectos ideas o lo que salga de tu imaginación para lo que podria ser tu peli ideal. La app sirver para hacer un esquema de lo que serian tus ideas y que otros usuarios se inspiren y viceversa y poder hablar sobre ellas.

#### (https://github.com/Marcossfh/your-movie-client)

#### (https://github.com/Marcossfh/tus-pelis-server)

## Technologies & Libraries used

HTML, CSS, Javascript, React, axios, React Context

## Backlog Functionalities

Mejorar la presentacion de la app. Dar la opcion a los usuarios de subir sus propios videos. Enlazar las peliculas relacionadas con una pagina de cine tipo Imdb o Filmaffinitty.

# Client Structure

## User Stories

- **404** - Not found para decirle al usuario que por ahi no vamos a ningun lado
- **500** - Error page para que el usuario sepa que ha sido fallo nuestro
- **homepage** - Pagina de inicio para registrarse o logearse y acceder al resto de la pagina
- **sign up** - Registrase para acceder al contenido
- **login** - Logearse para acceder al contenido
- **logout** - Hacer log out para salir de mi cuenta y que nadie mas se conecte a través de ella
- **events list** - Ver todas las acciones disponibles una vez registrado y logeado
- **events create** - Crear tu propia peli

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)

| Path                          | Page       | Components              | Permissions             | 
| `/`                           | Home       |                         | public                  | Home page                                                     |
| `/signup`                     | Signup     |                         | anon only `<IsAnon>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                      | Login      |                         | anon only `<IsAnon>`    | Login form, link to signup, navigate to homepage after login  |
| `/main-movies-page`           | Profile    |                         | user only `<IsPrivate>` | Main page with links to caregories                            |
| `/favorito-page`              | Favourites | MovieCard               | user only `<IsPrivate>` | Show users favourites                                         |
| `/terror-page`                | Category   | MovieCard               | user only `<IsPrivate>` | Shows all terror list                                         |
| `/syfy-page`                  | Category   | MovieCard               | user only `<IsPrivate>` | Shows all syfy list                                           |
| `/ficha-movies-page/:movieId` | MovieCard  | user only `<IsPrivate>` | Show movie details      |
| `/create-movies-page`         |            | user only `<IsPrivate>` | Create movie            |
| `/edit-movie/:movieId`        |            | user only `<IsPrivate>` | Edit movie              |
| `/comment-page`               |            | user only `<IsPrivate>` | Comments                |
| `*`                           |            |                         | Not found               |

## Other Components

- Navbar

## Context

- auth.context

### Collaborators

[Developer Marcos](https://github.com/Marcossfh)

### Project

[Repository Link Client](https://github.com/Marcossfh/your-movie-client)

[Repository Link Server](https://github.com/Marcossfh/tus-pelis-server)
