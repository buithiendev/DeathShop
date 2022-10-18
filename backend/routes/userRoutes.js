const { register,checkEmail, getAllUsers } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/checkEmail", checkEmail);
router.get("/getAllUsers", getAllUsers)

module.exports = router;
