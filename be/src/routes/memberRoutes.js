import express from "express";
import memberController from "../controllers/memberController";

let router = express.Router();

//member route

router.get("/members", memberController.getDisplayMember);
router.post("/members/update", memberController.updateMember);
router.get("/members/delete", memberController.deleteMember);
router.get("/members/sync", memberController.syncMember);

router.get("/members/:userId", memberController.getMemberByUserId);

export default router;
