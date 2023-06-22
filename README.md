This is a test project, created some backend api for creating and fetching movie or tv shows.
# Technology Used:
Language: JavaScript

Backend: NextJS

CMS: Squidex

Database: MongoDB

Data-fetching: GraphQL

## Getting Started

First, Install the dependency
```bash
npm install
#or
yarn
```

then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# base_url = http://localhost:3000/api

API: base_url/auth/signup

Method: POST

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "roles": "admin if you want to create and admin user or null if you want to create a normal user"
}
```
API: base_url/auth/signin

Method: POST

```json
{
  "username": "string",
  "password": "string"
}
```
API: base_url/shows/movie-list

Method: GET

It will return the movie list

API: base_url/shows/tv-shows-list

Method: GET

It will return the return the tv show list

API: base_url/shows/uuid

Method: GET

It will filter the show based on this id.

API: base_url/shows/create

Method: POST

Authorization: Bearer jwt token after successfully login

```json
{
  "showName": "string",
  "duration": "Float",
  "category": "Movie/ TV Show",
  "casts": [
    {
      "name": "string",
      "roleName": "string"
    }
  ],
  "director": [
    {
      "name": "string"
    }
  ]
}
```