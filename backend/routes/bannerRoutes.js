const {
    add,
    get,
    remove
} = require('../controllers/bannerController');

const router = require('express').Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
}).array('Image', 30);

const uploadImage = require('../services/firebase');

router.post('/add',upload,uploadImage,add)
router.get('/getbanner',get)
router.post('/remove/:id',remove)

module.exports = router;