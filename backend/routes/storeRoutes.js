const {
    add,getAll
} = require('../controllers/storeController');

const router = require('express').Router();

router.post('/add',add)
router.get('/get',getAll)

module.exports = router;