import { inject, injectable } from "tsyringe";
import { IStatesRepository } from "../../repositories/IStatesRepository";
import { State } from "../../infra/sequelize/models/State";
import { Loan } from "../../infra/sequelize/models/Loan";
import { ILoansRepository } from "../../repositories/ILoansRepository";

@injectable()
class ListLoansUseCase {
  constructor(
    @inject("LoansRepository")
    private loansRepository: ILoansRepository,
  ) { }

  async execute(): Promise<Loan[]> {
    return this.loansRepository.list()
  }
}
export { ListLoansUseCase }