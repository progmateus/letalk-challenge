import { inject, injectable } from "tsyringe";
import { ILoansRepository } from "../../repositories/ILoansRepository";
import { ICreateLoanDTO } from "../../dtos/ICreateLoanDTO";
import { AppError } from "../../../../errors/AppError";
import { IStatesRepository } from "../../repositories/IStatesRepository";
import dayjs from "dayjs";
import { z } from "zod";
import { isValidCPF } from "../../../../utils/isValidCpf";
import { calcPercent } from "../../../../utils/calcPercent";
import { Loan } from "../../infra/sequelize/models/Loan";


const loanSchema = z.object({
  balance: z.number().min(50000),
  state_id: z.number(),
  birth_date: z.string(),
  cpf: z.string(),
  installments_value: z.number().int().positive()
});
@injectable()
class CreateLoanUseCase {
  constructor(
    @inject("LoansRepository")
    private loansRepository: ILoansRepository,
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
  ) { }

  async execute({ balance, birth_date, cpf, state_id, installments_value }: Omit<ICreateLoanDTO, "installments_times" | "maturity_date" | "interest">): Promise<Loan> {
    const uf = await this.statesRepository.findById(state_id);

    if (!uf) {
      throw new AppError("ERR_UF_NOT_FOUND", 404);
    }

    loanSchema.parse({ balance, birth_date, cpf, state_id, installments_value })

    if (!isValidCPF(cpf)) {
      throw new AppError("ERR_INVALID_CPF", 400);
    }

    const state = await this.statesRepository.findById(state_id);

    if (!state) {
      throw new AppError("ERR_STATE_NOT_FOUND", 404);
    }

    if (calcPercent(balance, 1) > installments_value) {
      throw new AppError("ERR_INSTALLMENTS_MIN_VALUE", 400);
    }

    const installments_times = Math.floor((balance + (calcPercent(balance, state.interest))) / installments_value);

    const balance_with_interest = balance + (calcPercent(balance, state.interest) * installments_times);

    /* armazenar a taxa de juros atual pois ela pode ser alterada conforme o tempo */

    const loan = await this.loansRepository.create({
      balance: Number(balance.toFixed(2)),
      balance_with_interest: Number(balance_with_interest.toFixed(2)),
      birth_date,
      cpf: cpf.replace('.', '').replace('.', '').replace('-', ''),
      current_interest: uf.interest,
      installments_value,
      installments_times,
      maturity_date: dayjs().add(installments_times, "month").toDate(),
      state_id,
    })

    return this.loansRepository.findById(loan.id);
  }
}
export { CreateLoanUseCase }