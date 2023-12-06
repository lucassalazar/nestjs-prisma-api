## Description

A Bookmarks REST API implementation built with:

- [Node.js](https://nodejs.org/en).
- [TypeScript](https://www.typescriptlang.org/).
- [NestJS](https://nestjs.com/).
- [PostgreSQL](https://www.postgresql.org/).
- [Prisma](https://www.prisma.io/).
- [Docker](https://www.docker.com/).
- [Class Validator](https://www.npmjs.com/package/class-validator).
- [JWT](https://jwt.io/).

## Features

- CRUD operations for users and bookmarks
- Authentication and authorization with JWT
- Validation (Class Validator)
- Testing (e2e & integration)

## Setup

1. Copy the contents of `.env.sample` to `.env`
2. Copy the contents of `.env.test.sample` to `.env.test`
3. Install dependencies `npm install`
4. Restart docker dev-db and run migrations `npm run db:dev:restart`
5. Start dev server `npm run start:dev`
6. Restart docker test-db, run migrations and run e2e testing `npm run test:e2e`
7. Restart docker test-db, run migrations and run integration testing `npm run test:e2e`

## API endpoints

### Authentication

- `POST /auth/signup`: Signup a new user
- `POST /auth/signin`: Sign in and get an access token

### Users

- `GET /users/me`: Get signed user info
- `PATCH /users`: Edit the signed user

### Bookmarks

- `GET /bookmarks`: Get all bookmarks
- `GET /bookmarks/:id`: Get a bookmark by ID
- `POST /bookmarks`: Create a new bookmark
- `PATCH /bookmarks/:id`: Edit a bookmark by ID
- `DELETE /bookmarks/:id`: Delete a bookmark by ID
