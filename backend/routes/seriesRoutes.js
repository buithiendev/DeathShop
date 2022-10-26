const { add, getAll, addWithImage } = require('../controllers/seriesController');
const router = require('express').Router();

router.post('/add', add);
router.get('/getAll', getAll);

module.exports = router;
