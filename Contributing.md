# Contributing

Follow these guidelines to commit to this project so it makes everybody's life easier.
## Backend

Kindie backend server is built using express, GraphQL, Postgres and Redis so make sure you install databases and make sure to have them up and running. 
Make sure you have node >=14.x installed and yarn.

### Good starter links
<ul>
    <li><a href="https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart">Postgres on Linux</a></li>
    <li><a href="https://www.postgresqltutorial.com/install-postgresql/">Postgres on windows</a></li>
    <li><a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04">Redis on Linux</a></li>
    <li><a href="https://dev.to/divshekhar/how-to-install-redis-on-windows-10-3e99">Redis on windows</a></li>
</ul>

### Getting started

1. To run the backend server you will need to install the database and caching database first.
2. To successfully run the app open Postgres and create a database called dv_organizator.
3. Then create a .env file and copy all of the provided data from the .env.example and data fill data that is provided to you.
4. Install packages by running ```yarn``` in the backend folder.
5. After packages are installed you need to compile typescript by running either ```yarn watch``` or ```yarn build```.
6. App should run now and you can run dev server by running ```yarn dev```.

### Contributing

For contributing to the backend if you use Visual studio code make sure to have these extensions:

- Prettier
- [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)
- Yarn(It's ok to use npm but don't commit package-lock.json)

## Frontend

Kindie frontend is built using NextJS, Urql, and form. Make sure you have node >=14. x and yarn installed.

### Getting started

1. To run the frontend you need to install packages using the command ```yarn```.
2. To use the frontend you need to install and run the backend server.
3. To start the dev server you need to run ```yarn dev```.

### Contributing

For contributing to the frontend if you use Visual studio code make sure to have these extensions:

- Prettier
- Yarn(Same goes for backend)

To contribute code make sure to PR it onto the master branch so we can test it and give it a good look whilst not introducing any problems to the prod branch.

# NOTICE

1. If you are using any other editor like vim, sublime, etc. make sure to have some kind of typescript syntax and type extension to validate provided code
2. Make sure to run prettier format to format code before submitting so code is nice and format.
3. Make sure that you match all of your types and that you don't ignore type errors even tho if it works.
4. Make sure that you commit smaller chunks and not one giant chunk as it is easier to review.
5. Take your time with solving a problem, rushed code is the worst code. You do not have a time constraint.