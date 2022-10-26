const { getById } = require('../controllers/imageController');
const router = require('express').Router();

router.get('/getById/:id', getById);

module.exports = router;
