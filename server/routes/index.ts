import express from "express";
import v1Routes from "./v1";
const router = express.Router();
router.use("/v1", v1Routes); //http://localhost:3000/api/v1
export default router;
