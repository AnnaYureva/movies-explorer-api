const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validationCreateMovie, validationDeleteMovie } = require('../middlewars/validation');

router.get('/', getMovies); // получение списка фильмов
router.post('/', validationCreateMovie, createMovie); // создание фильма
router.delete('/:movieId', validationDeleteMovie, deleteMovie); // удаление фильма по айди

module.exports = router;
