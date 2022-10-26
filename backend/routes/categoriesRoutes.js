const { add, update, getAll, getById } = require('../controllers/categoriesController');

const router = require('express').Router();

router.post('/add', add);
router.post('/update/:id', update);
router.get('/getAll', getAll)
router.get('/getById/:id',getById)

module.exports = router;
