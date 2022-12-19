const {
    add,
    update,
    getAll,
    getById,
    changeStatus,
    getByIdName,
    getAllActive,
} = require('../controllers/categoriesController');

const router = require('express').Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
}).array('Image', 30);

const uploadImage = require('../services/firebase');

router.post('/add', upload, uploadImage, add);
router.post('/update/:id', upload, uploadImage, update);
router.post('/changeStatus/:id', changeStatus);
router.get('/getAll', getAll);
router.get('/getAllActive', getAllActive);
router.get('/getById/:id', getById);
router.get('/getByIdName/:id', getByIdName);

module.exports = router;
