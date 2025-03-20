import express from "express";
import loanController from "../controllers/loanController.js";

const router = express.Router();

// Route mượn sách
router.get("/loans", loanController.getAllLoans);

router.post("/loans/borrow", loanController.borrowBook);

router.post("/loans/return", loanController.returnBook);

router.post("/loans/request-renew", loanController.requestRenewLoan);

router.post("/loans/approve-renew", loanController.approveRenewLoan);

router.get("/loans/current/:memberId", loanController.getCurrentLoans);
export default router;
