import express from "express";
import * as controller from "../controllers/roomCategoryController.js";

const router = express.Router();

router.post("/", controller.createRoomCategory);
router.get("/", controller.getAllRoomCategories);
router.get("/:id", controller.getRoomCategoryById);
router.put("/:id", controller.updateRoomCategory);
router.delete("/:id", controller.deleteRoomCategory);

export default router;