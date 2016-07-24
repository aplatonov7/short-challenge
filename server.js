import path from 'path'
import express from 'express'
import webpack from 'webpack'
import fetch from 'node-fetch'
import proxy from 'express-http-proxy'
import {API_URL} from './app/config'

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000
const host = process.env.HOST ? process.env.HOST : 'localhost'


/* Setting up proxy through our dev server to avoid CORS problems */
app.use('/api', proxy(API_URL))

if (process.env.NODE_ENV === 'development') {
  /* We are serving our application through express in development (using webpack-dev-middleware) */
  const compiler = webpack(require('./webpack.config.dev'))

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/'
  }));

  app.use(require('webpack-hot-middleware')(compiler))
} else {
  /* And in production we just serve files from dist folder */
  app.get('*', express.static(path.join(__dirname, 'dist')))
}

/* Starting the server, port can be configured using PORT env variable */
app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at ${host}:${port}`);
});