const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedCors = require('./middlewares/cors');
const router = require('./routes');
const errorHandler = require('./middlewares/error');

const app = express();
app.use(cors());
mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(allowedCors);

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port 3001');
});
