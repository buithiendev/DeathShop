const {
    add,
    getById,
    getAll,
    updateImei,
    updateStatus,
    updateStatusPayment,
    updateAllStatus,
    getOrderByOrderAccout,
    sendMail,
    cancelOrder,
} = require('../controllers/orderController');

const router = require('express').Router();

router.post('/add', add);
router.get('/getById/:id', getById);
router.get('/getAll', getAll);
router.post('/updateImei/:id', updateImei);
router.post('/updateStatus/:id', updateStatus);
router.post('/updateStatusPayment/:id', updateStatusPayment);
router.post('/updateAllStatus/:id', updateAllStatus);
router.get('/getWithOrderAccount/:id', getOrderByOrderAccout);
router.post('/sendMail', sendMail);
router.post('/cancelOrder/:id',cancelOrder);

module.exports = router;
