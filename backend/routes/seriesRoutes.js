const { add, getAll, addWithImage, update } = require('../controllers/seriesController');
const router = require('express').Router();

router.post('/add', add);
router.get('/getAll', getAll);
router.post('/update/:id',update);

module.exports = router;
