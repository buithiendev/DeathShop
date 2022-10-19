const {
  register,
  checkEmail,
  getAllUsers,
  updateStatus,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/checkEmail", checkEmail);
router.post("/updateStatus/:id", updateStatus);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
