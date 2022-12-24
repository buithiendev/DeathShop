const {
    authenticated,
    refresh,
    create,
    login,
    logout,
    changePassword,
    changeInfo,
    addAddress,
    addToCart
} = require('../controllers/customerController');

const router = require('express').Router();

router.post('/create', create);
router.post('/login', login);
router.post('/changePassword/:email', changePassword);
router.post('/changeInfo/:email', changeInfo);
router.post('/addAddress/:email', addAddress);
router.post('/logout', logout);
router.get('/get', authenticated);
router.post('/refresh', refresh);
router.post('/addToCart/:id',addToCart)


module.exports = router;
