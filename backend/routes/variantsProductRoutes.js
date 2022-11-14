const { getById } = require('../controllers/variantsProductController');
const router = require('express').Router();

router.get('/getById/:id', getById);
// router.post('/add', add);
// router.get('/getAll', getAll);
// router.get('/getByCateIdName/:id', getByCateIdName)
// router.post('/update/:id',update);

module.exports = router;
