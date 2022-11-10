const {
    add,
    get,
    getByCateId,
    getByCateIdName,
    getBySeriesId,
} = require('../controllers/productController');

const router = require('express').Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
}).array('Image', 10);

const uploadImage = require('../services/firebase');

router.post('/add', upload, uploadImage, add);
router.get('/get/:id', get);
router.get('/getByCateId/:id', getByCateId);
router.get('/getByIdName/:id', getByCateIdName);
router.get('/getBySeriesId/:id', getBySeriesId);

module.exports = router;
