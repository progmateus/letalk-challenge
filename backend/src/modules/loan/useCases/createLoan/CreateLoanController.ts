import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLoanUseCase } from "./CreateLoanUseCase";

class CreateLoanController {
  async handle(request: Request, response: Response) {
    const { balance, birth_date, cpf, state_id, installments_value } = request.body;
    const createLoanUseCase = container.resolve(CreateLoanUseCase)
    const data = await createLoanUseCase.execute({ balance, birth_date, cpf, state_id, installments_value });
    return response.status(201).json({ message: "CREATED", data })
  }
}
export { CreateLoanController }