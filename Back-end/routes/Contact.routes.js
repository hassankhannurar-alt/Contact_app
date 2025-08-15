import express from "express";
import {
  CreateContact,
  DeleteContact,
  getById,
  getContact,
  getSpecificNumber,
  UpdateContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  return res.send("contact route is working...");
});

router.get("/getAll", getContact);
router.get("/getById/:id", getById);
router.post("/create/:userId", CreateContact);
router.get("/getSpecificNumber/:userId/:numberId", getSpecificNumber);
router.put("/update/:userId/:numberId", UpdateContact);
router.delete("/delete/:userId/:numberId", DeleteContact);

export default router;
