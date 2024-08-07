import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListStatesUseCase } from "./ListStatesUseCase";

class ListStatesController {
  async handle(request: Request, response: Response) {
    const listStatesUsecase = container.resolve(ListStatesUseCase)
    const states = await listStatesUsecase.execute();
    return response.status(200).json({ message: "LISTED", data: states })
  }
}
export { ListStatesController }