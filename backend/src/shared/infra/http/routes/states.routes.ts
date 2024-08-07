import { Router } from "express";
import { ListStatesController } from "../../../../modules/loan/useCases/listStates/ListStatesController";

const statesRoutes = Router();
const listStatesController = new ListStatesController()

statesRoutes.get("/", listStatesController.handle);

export { statesRoutes };
