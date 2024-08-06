import { Router } from "express";
import { CreateLoanController } from "../../../../modules/loan/useCases/createLoan/CreateLoanController";
import { SimulateLoanController } from "../../../../modules/loan/useCases/simulation/SimulateLoanController";

const loansRoutes = Router();
const createLoanController = new CreateLoanController()
const simulateLoanController = new SimulateLoanController()

loansRoutes.post("/", createLoanController.handle);
loansRoutes.post("/simulate", simulateLoanController.handle);

export { loansRoutes };
