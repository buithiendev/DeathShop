const { add, getAll, addWithImage, update, getByCateIdName } = require('../controllers/seriesController');
const router = require('express').Router();

router.post('/add', add);
router.get('/getAll', getAll);
router.get('/getByCateIdName/:id', getByCateIdName)
router.post('/update/:id',update);

module.exports = router;
