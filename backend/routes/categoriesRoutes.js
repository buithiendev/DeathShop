const { add, update, getAll, getById } = require('../controllers/categoriesController');

const router = require('express').Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
}).array('testImage', 10);

const uploadImage = require("../services/firebase")

router.post('/add',upload,uploadImage ,add);
router.post('/update/:id', update);
router.get('/getAll', getAll)
router.get('/getById/:id',getById)

module.exports = router;
