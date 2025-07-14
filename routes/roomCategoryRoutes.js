import express from "express";
import * as controller from "../controllers/roomCategoryController.js";
import { checkForAuthentication, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

//public routes for everyone
router.get("/", controller.getAllRoomCategories);
router.get("/:id", controller.getRoomCategoryById);

//room management for admin use only
router.post("/", checkForAuthentication, restrictTo(["admin"]), controller.createRoomCategory);
router.put("/:id", checkForAuthentication, restrictTo(["admin"]), controller.updateRoomCategory);
router.delete("/:id", checkForAuthentication, restrictTo(["admin"]), controller.deleteRoomCategory);

export default router;