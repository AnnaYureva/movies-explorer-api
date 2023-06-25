const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');
const { validationGetUser, validationUpdateUser } = require('../middlewars/validation');

router.get('/me', validationGetUser, getUser);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
