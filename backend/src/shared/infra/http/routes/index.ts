import { Router } from "express";
import { loansRoutes } from "./loans.routes";
import { statesRoutes } from "./states.routes";

const router = Router();
router.use("/loans", loansRoutes)
router.use("/states", statesRoutes)

export { router };