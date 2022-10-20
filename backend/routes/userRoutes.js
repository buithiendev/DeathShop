const {
    register,
    checkEmail,
    getAllUsers,
    updateStatus,
    getUserById,
    updateUser,
    login,
    authenticated,
    refresh,
    logout,
} = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticated);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/checkEmail', checkEmail);
router.post('/updateStatus/:id', updateStatus);
router.post('/updateUser/:id', updateUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:id', getUserById);

module.exports = router;
