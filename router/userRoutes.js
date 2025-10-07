const express = require("express");
const {
  AddUser,
  GetAllUser,
  GetUserById,
  UpdateUser,
  DeleteUser,
} = require("../Controller/userController");
const router = express.Router();
router.get("/", GetAllUser);
router.get("/:id", GetUserById);
router.post("/add", AddUser);
router.put("/update/:id", UpdateUser);
router.delete("/delete/:id", DeleteUser);
module.exports = router;
