/* eslint-disable */
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const config = require('./next.config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, config });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync('./certs/localhost.key'),
  cert: fs.readFileSync('./certs/localhost.crt'),
};

app.prepare().then(() => {
  createServer(options, (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});
