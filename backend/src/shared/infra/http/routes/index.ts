import { Router } from "express";
import { loansRoutes } from "./loans.routes";

const router = Router();
router.use("/loans", loansRoutes)

export { router };