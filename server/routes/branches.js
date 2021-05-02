import express from "express";
const router = express.Router();

import { signin,getBranches } from "../controllers/branches.js";

router.post("/signin", signin);
router.get("/:pincode", getBranches);

export default router;