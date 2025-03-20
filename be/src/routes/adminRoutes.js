import express from "express";
import adminController from "../controllers/adminController";
import authMiddleware from "../middlewares/authMiddleware";

let router = express.Router();

//admin route
// sử dụng middleware để chọn lọc chỉ admin mới có thể vào các route này

router.get("/admin", adminController.getDisplayAdmin);
router.get("/admin/sync", adminController.syncAdmin);
router.post("/admin/update", adminController.updateAdmin);
router.post("/admin/delete", adminController.deleteAdmin);

export default router;
