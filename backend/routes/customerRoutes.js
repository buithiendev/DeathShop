const { create, login } = require('../controllers/customerController');
const router = require('express').Router();

router.post('/create', create);
router.post('/login', login)

module.exports = router;
