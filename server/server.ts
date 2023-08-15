import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import { authMiddleware } from './lib/authorization-middleware.js';
import pg from 'pg';
import { validateInput } from './lib/validations.js';
import ClientError from './lib/client-error.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

type Auth = {
  username: string;
  password: string;
};

type User = {
  userId: number;
  username: string;
  password: string;
};

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
// Needs to check if user is signed in.
app.post('/api/entries', authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoURLBig,
      photoAuthor,
      photoAuthorLink,
      photoAlt,
      userId,
    } = req.body;
    validateInput(title);
    validateInput(subtitle);
    validateInput(location);
    validateInput(body);
    validateInput(photoURL);
    validateInput(photoURLBig);
    validateInput(photoAuthor);
    validateInput(photoAuthorLink);
    validateInput(photoAlt);

    const sql = `
      insert into "entries" ("userId", "title", "subtitle", "location", "body", "photoURL", "photoURLBig", "photoAlt", "photoAuthor", "photoAuthorLink")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *
    `;
    const params = [
      userId,
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoURLBig,
      photoAlt,
      photoAuthor,
      photoAuthorLink,
    ];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(500, 'Something went wrong.');
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* Endpoint to update an existing entry, doesn't return anything because entryId already exists and
the client already has access to it so it will just switch to the post automatically. Needs to check
if user is signed in and if entry belongs to them. */
app.put('/api/entries/:entryId', authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoURLBig,
      photoAuthor,
      photoAuthorLink,
      photoAlt,
      userId,
    } = req.body;
    if (userId !== req.body.user.userId) {
      throw new ClientError(401, 'wrong authentication');
    }
    const entryId = Number(req.params.entryId);
    validateInput(title);
    validateInput(subtitle);
    validateInput(location);
    validateInput(body);
    validateInput(photoURL);
    validateInput(photoURLBig);
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
            "photoURLBig" = $6,
            "photoAlt" = $7,
            "photoAuthor" = $8,
            "photoAuthorLink" = $9
        where "entryId" = $10
        returning *
    `;
    const params = [
      title,
      subtitle,
      location,
      body,
      photoURL,
      photoURLBig,
      photoAlt,
      photoAuthor,
      photoAuthorLink,
      entryId,
    ];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(500, 'Something went wrong.');
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// Endpoint to delete an entry by the given entry id.
// Needs to check if user is signed in and if entry is their entry.
app.delete('/api/entries/:entryId', authMiddleware, async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    const userId = req.body.userId;
    if (userId !== req.body.user.userId) {
      throw new ClientError(401, 'wrong authentication');
    }
    if (!Number.isInteger(entryId) || entryId <= 0) {
      throw new ClientError(400, `Blog #${entryId} does not exist`);
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
      throw new ClientError(404, `Cannot find blog #${entryId}`);
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

    // Not using '*' so I don't return user's passwords
    const sql = `
      select "entryId", "userId", "title", "subtitle", "location", "body", "date", "photoURL", "photoURLBig", "photoAlt", "photoAuthor", "photoAuthorLink", "userId", "username"
        from "entries"
        join "users" using ("userId")
        where "entryId" = $1
    `;
    const params = [entryId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `Cannot find blog post #${entryId}`);
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
    // Not using '*' so I don't return user's passwords
    const sql = `
      select "entryId", "userId", "title", "subtitle", "location", "body", "date", "photoURL", "photoURLBig", "photoAlt", "photoAuthor", "photoAuthorLink", "userId", "username"
        from "entries"
        join "users" using ("userId")
        order by "date" desc
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

    // Not using '*' so I don't return user's passwords
    const sql2 = `
      select "entryId", "userId", "title", "subtitle", "location", "body", "date", "photoURL", "photoURLBig", "photoAlt", "photoAuthor", "photoAuthorLink", "userId", "username"
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

// Endpoint for user registration, hashes given password and stores hashed password on db. Returns new userId and username.
app.post('/api/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<User>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "password")
        values ($1, $2)
        returning "userId",
                  "username"
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(500, `Something went wrong`);
    }
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// Endpoint for user sign in, checks hashed password against given one to determine if its a valid login. Returns userId and username.
app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Auth;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select *
        from "users"
        where "username" = $1
    `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const userInfo = result.rows[0];
    if (!userInfo) {
      throw new ClientError(401, 'invalid login');
    }
    const isMatching = await argon2.verify(userInfo.password, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = {
      userId: userInfo.userId,
      username,
    };
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      throw new Error();
    }
    const token = jwt.sign(payload, secret);
    res.status(200).json({ user: payload, token });
  } catch (err) {
    next(err);
  }
});
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
