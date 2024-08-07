import { Router } from "express";
import { ListStatesController } from "../../../../modules/loan/useCases/listStates/ListStatesController";

const statesRoutes = Router();
const listStatesController = new ListStatesController()

statesRoutes.post("/", listStatesController.handle);

export { statesRoutes };
