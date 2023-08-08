import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import { validateInput } from './lib/validations.js';
import ClientError from './lib/client-error.js';
// import jwt from 'jsonwebtoken';

// type Auth = {
//   username: string;
//   password: string;
// };

// type User = {
//   userId: number;
//   username: string;
//   password: string;
// };

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// Endpoint to create a new entry, returns the new entry so it can swap to it.
app.post('/api/entries', async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoAuthor,
      photoAuthorLink,
      photoAlt,
    } = req.body;
    validateInput(title);
    validateInput(subtitle);
    validateInput(location);
    validateInput(body);
    validateInput(photoURL);
    validateInput(photoAuthor);
    validateInput(photoAuthorLink);
    validateInput(photoAlt);

    const sql = `
      insert into "entries" ("userId", "title", "subtitle", "location", "body", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *
    `;
    const params = [
      1,
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoAlt,
      photoAuthor,
      photoAuthorLink,
    ];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

/* Endpoint to update an existing entry, doesn't return anything because entryId already exists and
the client already has access to it so it will just switch to the post automatically. */
app.put('/api/entries/:entryId', async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoAuthor,
      photoAuthorLink,
      photoAlt,
    } = req.body;
    const entryId = Number(req.params.entryId);
    validateInput(title);
    validateInput(subtitle);
    validateInput(location);
    validateInput(body);
    validateInput(photoURL);
    validateInput(photoAuthor);
    validateInput(photoAuthorLink);
    validateInput(photoAlt);

    const sql = `
      update "entries"
        set "title" =  $1,
            "subtitle" = $2,
            "location" = $3,
            "body" = $4,
            "photoURL" = $5,
            "photoAlt" = $6,
            "photoAuthor" = $7,
            "photoAuthorLink" = $8
        where "entryId" = $9
    `;
    const params = [
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoAlt,
      photoAuthor,
      photoAuthorLink,
      entryId,
    ];
    await db.query(sql, params);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// Endpoint to delete an entry by the given entry id. Will only be available to user's own posts.
app.delete('/api/entries/:entryId', async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!Number.isInteger(entryId) || entryId <= 0) {
      throw new ClientError(400, `${entryId} does not exist`);
    }
    const sql = `
      delete
      from "entries"
      where "entryId" = $1
      returning *
    `;
    const params = [entryId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `Cannot find blog post ${entryId}`);
    }
    res.status(204).json(result);
  } catch (err) {
    next(err);
  }
});

// Endpoint to get a single entry to be able to render the full page of the entry.
app.get('/api/entries/:entryId', async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!Number.isInteger(entryId) || entryId <= 0) {
      throw new ClientError(400, `${entryId} does not exist`);
    }
    const sql = `
      select "entryId", "userId", "title", "subtitle", "location", "body", "date", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink", "userId", "username"
        from "entries"
        join "users" using ("userId")
        where "entryId" = $1
    `;
    const params = [entryId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `Cannot find blog post ${entryId}`);
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* Endpoint to retrieve 15 of the most recent entries for
rendering on the main page. (subject to change if I implement follower feed) */
app.get('/api/entries', async (req, res, next) => {
  try {
    const sql = `
      select "entryId", "userId", "title", "subtitle", "location", "body", "date", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink", "userId", "username"
        from "entries"
        join "users" using ("userId")
    `;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

/* Finds relevant userId from given username and then uses that id to find
all entries that were made by that user to populate profile page */
app.get('/api/profiles/:username', async (req, res, next) => {
  try {
    const username = req.params.username;

    const sql1 = `
      select "userId"
        from "users"
        where "username" = $1
    `;
    const params1 = [username];
    const result1 = await db.query(sql1, params1);

    const sql2 = `
      select "entryId", "userId", "title", "subtitle", "location", "body", "date", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink", "userId", "username"
        from "entries"
        join "users" using ("userId")
        where "userId" = $1
    `;
    const params = [result1.rows[0].userId];
    const result2 = await db.query(sql2, params);
    res.status(200).json(result2.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/key', (req, res) => {
  res.json(process.env.UNSPLASH_KEY);
});

// app.post('/api/auth/sign-in', async (req, res, next) => {
//   try {
//     const {username, password } = req.body as Auth;
//     if (!username || !password) {
//       throw new ClientError(401, 'invalid login');
//     }
//     const sql = `
//       select *
//         from "users"
//         where "username" = $1
//     `;
//     const params = [username];
//     const result = await db.query<User>(sql, params);
//     const userInfo = result.rows[0];
//     if (!userInfo) {
//       throw new ClientError(401, 'invalid login');
//     }
//     // const isMatching = await argon2.verify(userInfo.password, password);
//     // if (!isMatching) {
//       // throw new ClientError(401, 'invalid login');
//     // }
//     const payload = {
//       userId: userInfo.userId,
//       username,
//     };
//     const secret = process.env.TOKEN_SECRET;
//     if (!secret) {
//       throw new Error();
//     }
//     const token = jwt.sign(payload, secret);
//     res.status(200).json({ payload, token });
//   } catch (err) {
//     next(err);
//   }
// });
/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
