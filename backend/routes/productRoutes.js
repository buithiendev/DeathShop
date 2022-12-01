const {
    add,
    get,
    getByCateId,
    getByCateIdName,
    getBySeriesId,
    getByIdName,
    getAll,
    deleteProduct,
} = require('../controllers/productController');

const router = require('express').Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
}).array('Image', 30);

const uploadImage = require('../services/firebase');

router.post('/add', upload, uploadImage, add);
router.get('/get/:id', get);
router.get('/getByCateId/:id', getByCateId);
router.get('/getByIdName/:id', getByIdName);
router.get('/getByCateIdName/:id', getByCateIdName);
router.get('/getBySeriesId/:id', getBySeriesId);
router.get('/getAll',getAll);
router.post('/delete/:id', deleteProduct);

module.exports = router;
