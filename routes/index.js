const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const auth = require('../middlewars/auth');
const NotFound = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/user');
const { validationLogin, validationCreateUser } = require('../middlewars/validation');

// роуты регистрации и авторизации не защищены
router.post('/sign-in', validationLogin, login);
router.post('/sign-up', validationCreateUser, createUser);

// далее подключаем роуты для авторизированного пользователя
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(auth, userRouter);
router.use(auth, movieRouter);

// роут для неверного адреса
router.use('*', (req, res, next) => {
  next(new NotFound('Cтраница не существует'));
});

module.exports = router;
