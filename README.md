# Fullstack Afiliados

This project is a monorepo. Consists of a platform to upload a specific type of file, containing information about each customer's product transactions, with the purpose of processing the data and displaying the listing.

> This is a challenge by [Coodesh](https://coodesh.com/)

The definitions of the requests and the strategies for creating the application for both the backend and the frontend are in the [documentation](docs/README.md) file.

## Prototype

- The prototype created in [figma](https://www.figma.com) can be viewed at [this link](https://www.figma.com/file/ejQP2VeqcOPoucWYJoitTn/Afiliados?node-id=0-1&t=z3dBYz7y0SRYsTRu-0).

## Project Scrum

- I created a flow to simulate a scrum board with all the decision making I had during the development of this project. If you want to view it, click here.
  PS.: the board is in Portuguese.

## Frameworks and languages ​​used:

- Backend:
  - [Fastify](https://www.fastify.io/docs/latest/Guides/Getting-Started/)
  - [Node](https://nodejs.org/)
  - [Docker Compose](https://docs.docker.com/compose/)
  - [PrismaDB](https://www.prisma.io/docs/getting-started)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Vitest](https://vitest.dev/guide/)
- Frontend:
  - [Next](https://nextjs.org/docs)
  - [Styled Components](https://styled-components.com/docs/basics#getting-started)
  - [Axios](https://axios-http.com/ptbr/docs/intro)
  - [Zod](https://zod.dev/)
  - [React Hook Form](https://react-hook-form.com/get-started/)

## Instructions for execute this project

##### Backend

- Step one: clone this repository

- With HTTP:

  ```sh
  git clone https://github.com/natanhermes/fullstack-afiliados.git
  ```

- With SSH:

  ```sh
  git clone git@github.com:natanhermes/fullstack-afiliados.git
  ```

- Step two: setup api
  - Install dependencies(use [node version 18](https://nodejs.org/en/download)):
    ```sh
    cd fullstack-afiliados && cd backend && npm install
    ```
  - Rename file from [.env.example](/backend/.env.example) to ".env".
    Run:
    ```sh
    cp .env.example .env
    ```
  - If you don't have docker installed, follow these steps to install it:
    - For windows: https://docs.docker.com/desktop/install/windows-install/
    - For Mac: https://docs.docker.com/desktop/install/mac-install/
    - For Linux: https://docs.docker.com/desktop/install/linux-install/
  - To create the PostgreSQL database schema using docker compose, it is necessary to define the "DATABASE_URL" environment variable. I defined a default url that you can use or modify as you wish.
    Obs.: If you modify the docker configuration url, also modify the respective settings in the [docker-compose.yml](./backend/docker-compose.yml) file.
    Obs.2: For these commands to work, you need to have the docker service running on your machine.
    Run in [fullstack-afiliados/backend](/backend/) dir:
    ```sh
    docker-compose up -d
    ```
  - To create the migrations referring to the database tables.
    Run in [fullstack-afiliados/backend](/backend/) dir:
    ```sh
    npm run db:migrate
    ```
  - Finally, run project in dev mode:
    ```sh
    npm run start:dev
    ```

##### Frontend

- Step one: setup app
  - Install dependencies(use [node version 18](https://nodejs.org/en/download)):
    ```sh
    cd frontend && npm install
    ```
  - Rename file from [.env.example](/backend/.env.example) to ".env".
    Run:
    ```sh
    cp .env.example .env
    ```
- Step two:
  - Run app in dev mode:
    ```sh
    npm run dev
    ```
