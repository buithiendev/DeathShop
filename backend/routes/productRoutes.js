const { add, get } = require('../controllers/productController');

const router = require('express').Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
}).array('Image', 10);

const uploadImage = require("../services/firebase")

router.post('/add',upload, uploadImage, add);
router.get('/get/:id', get);
// router.post('/add',upload,uploadImage ,add);
// router.post('/update/:id',upload,uploadImage , update);
// router.post('/changeStatus/:id',changeStatus)
// router.get('/getAll', getAll)
// router.get('/getById/:id',getById)

module.exports = router;