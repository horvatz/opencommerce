# opencommerce

Headless e-commerce API for building web shops of new generation. Written in [NestJS](https://docs.nestjs.com/), powered by [GraphQL](https://graphql.org/) and [Prisma](https://www.prisma.io/).

## Installation

Create `.env` file with following structure:

```
DATABASE_URL: <DB_CONNECT_QUERY>
JWT_SECRET: <JWT_SECRET_KEY>
```

```bash
$ npm install
```

To seed DB with example data and create root user run:

```
$ npx prisma db seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
