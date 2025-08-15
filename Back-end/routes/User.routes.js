import { Router } from "express";
import UsersModel from "../models/Users.model.js";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/getAll", getUsers);
router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
