import { inject, injectable } from "tsyringe";
import { ILoansRepository } from "../../repositories/ILoansRepository";
import { ICreateLoanDTO } from "../../dtos/ICreateLoanDTO";
import { AppError } from "../../../../errors/AppError";
import { IStatesRepository } from "../../repositories/IStatesRepository";
import dayjs from "dayjs";

@injectable()
class CreateLoanUseCase {
  constructor(
    @inject("LoansRepository")
    private loansRepository: ILoansRepository,
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
  ) { }

  async execute({ balance, birth_date, cpf, state_id, installments_value }: Omit<ICreateLoanDTO, "installments_times" | "maturity_date" | "interest">) {
    const uf = await this.statesRepository.findById(state_id);

    if (!uf) {
      throw new AppError("ERR_UF_NOT_FOUND", 404);
    }

    /* armazenar a taxa de juros atual pois ela pode ser alterada conforme o tempo */
    const installments_times = 0;
    const maturity_date = dayjs().toDate();
    const interest = uf.interest;

    await this.loansRepository.create({
      balance,
      birth_date,
      cpf,
      interest,
      installments_value,
      installments_times,
      maturity_date,
      state_id,
    })
  }
}
export { CreateLoanUseCase }