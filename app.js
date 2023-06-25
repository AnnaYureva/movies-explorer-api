require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const error = require('./middlewars/error');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const routes = require('./routes');

// Слушаем 300 порт
const { PORT = 3000 } = process.env;

// создаем переменную с параметрами лимитера
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 1000, // лимит на 1000 запросов в минуту от одного айпи
  standardHeaders: true, // вернуть информцию об ограничениях в заголовки `RateLimit-*`
  legacyHeaders: false, // Отключить заголовки `X-RateLimit-*`
});

// создание инстанса сервера
const app = express();

// подключаем хэлмет
app.use(helmet());

// применяем миллдвэр ко всем запросам
app.use(limiter);

// делаем запрос объектом json
app.use(express.json());

app.use(cors());

// краш-тест

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(errors()); // обработка ошибок
app.use(error);

// Соединение с БД

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

// Запускаем сервер

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
