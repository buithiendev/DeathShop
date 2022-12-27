const { add, getById, getAll, updateImei, updateStatus, updateStatusPayment } = require('../controllers/orderController');

const router = require('express').Router();

router.post('/add', add);
router.get('/getById/:id',getById)
router.get('/getAll',getAll)
router.post('/updateImei/:id',updateImei)
router.post('/updateStatus/:id',updateStatus)
router.post('/updateStatusPayment/:id',updateStatusPayment)

module.exports = router;
