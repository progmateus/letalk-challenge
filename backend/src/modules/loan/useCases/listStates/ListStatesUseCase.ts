import { inject, injectable } from "tsyringe";
import { IStatesRepository } from "../../repositories/IStatesRepository";
import { State } from "../../infra/sequelize/models/State";

@injectable()
class ListStatesUseCase {
  constructor(
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
  ) { }

  async execute(): Promise<State[]> {
    return this.statesRepository.list()
  }
}
export { ListStatesUseCase }