import { Request, Response } from "express";
import { container } from "tsyringe";
import { SimulateLoanUseCase } from "./SimulateLoanUsecase";

class SimulateLoanController {
  async handle(request: Request, response: Response) {
    const { balance, birth_date, cpf, state_id, installments_value } = request.body;
    const simulateLoanUseCase = container.resolve(SimulateLoanUseCase)
    const data = await simulateLoanUseCase.execute({ balance, birth_date, cpf, state_id, installments_value });
    return response.status(200).json({ message: "SIMULATED", data })
  }
}
export { SimulateLoanController }