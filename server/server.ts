import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import { validateInput } from './lib/validations.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
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

app.post('/api/entries', async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      location,
      body,
      url,
      photographer,
      photographerURL,
      alt,
    } = req.body;
    validateInput(title);
    validateInput(subtitle);
    validateInput(location);
    validateInput(body);
    validateInput(url);
    validateInput(photographer);
    validateInput(photographerURL);
    validateInput(alt);

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
      url,
      alt,
      photographer,
      photographerURL,
    ];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/key', (req, res) => {
  res.json(process.env.UNSPLASH_KEY);
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
