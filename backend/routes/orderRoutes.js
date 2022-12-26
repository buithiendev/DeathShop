const { add, getById } = require('../controllers/orderController');

const router = require('express').Router();

router.post('/add', add);
router.get('/getById/:id',getById)

module.exports = router;
