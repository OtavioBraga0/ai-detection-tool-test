# AI Detection Tool - Test

### How to setup and run

First of all create `.env` using as example `.env.example`

- Run `npx prisma generate` to create the database

- Run `yarn dev` or `npm run dev` to run the project

## Techinical Choices

#### Atomic Design

Atomic Desing as structure for components. Basically was splitted in 4 folders

- Atoms - for single and simple components
- Molecules - for a aggregate of Atoms components
- Organisms - for aggregate of Molecules and Atoms components
- UI - for Shadcn components

#### Clean Architecture

I used a abstraction of Clean Architecture.

- Services Layer - used for `server actions` and external communications
- Domain Layer - used for `entities`, `schemas` and `store`
- App Layer - used for `presentation`

## Integrations

Was created 2 instances of `axios`, for `strapi` and `ud`.

Both was configured with `baseUrl` to appoint each API.

#### Strapi

Was created a generic function to comunicate with Strapi API and return the content populated. On page, was created a simple function to call this function as server side and populate the screen with content.

#### UD

Was created 2 functions for comunicate with UD API.

- Create a new document, sending a content and receiving a documentID. With this we can store on database all user's injections

- Query the documents to receive the results of detection

Was created a interval to get the list of injection on DB and populate our table.

When clicked on view button, open a modal to show more detailed information about result.

When clicked on delete button, the injection is deleted
