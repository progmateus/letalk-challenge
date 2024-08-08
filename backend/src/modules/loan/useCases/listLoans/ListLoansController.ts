import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListLoansUseCase } from "./ListLoansUseCase";

class ListLoansController {
  async handle(request: Request, response: Response) {
    const listLoansUseCase = container.resolve(ListLoansUseCase)
    const loans = await listLoansUseCase.execute();
    return response.status(200).json({ message: "LISTED", data: loans })
  }
}
export { ListLoansController }