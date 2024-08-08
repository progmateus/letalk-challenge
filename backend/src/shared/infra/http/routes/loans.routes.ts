import { Router } from "express";
import { CreateLoanController } from "../../../../modules/loan/useCases/createLoan/CreateLoanController";
import { SimulateLoanController } from "../../../../modules/loan/useCases/simulation/SimulateLoanController";
import { ListLoansController } from "../../../../modules/loan/useCases/listLoans/ListLoansController";

const loansRoutes = Router();
const createLoanController = new CreateLoanController()
const simulateLoanController = new SimulateLoanController()
const listLoansController = new ListLoansController()

loansRoutes.post("/", createLoanController.handle);
loansRoutes.get("/", listLoansController.handle);
loansRoutes.post("/simulate", simulateLoanController.handle);

export { loansRoutes };
