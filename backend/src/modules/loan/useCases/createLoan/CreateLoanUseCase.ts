import { inject, injectable } from "tsyringe";
import { ILoansRepository } from "../../repositories/ILoansRepository";
import { ICreateLoanDTO } from "../../dtos/ICreateLoanDTO";
import { AppError } from "../../../../errors/AppError";
import { IStatesRepository } from "../../repositories/IStatesRepository";
import dayjs from "dayjs";
import { z } from "zod";
import { isValidCPF } from "../../../../utils/isValidCpf";
import { calcPercent } from "../../../../utils/calcPercent";


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

  async execute({ balance, birth_date, cpf, state_id, installments_value }: Omit<ICreateLoanDTO, "installments_times" | "maturity_date" | "interest">) {
    const uf = await this.statesRepository.findById(state_id);

    if (!uf) {
      throw new AppError("ERR_UF_NOT_FOUND", 404);
    }

    loanSchema.parse({ balance, birth_date, cpf, state_id, installments_value })

    if (!isValidCPF(cpf)) {
      throw new AppError("ERR_INVALID_CPF", 400);
    }
    if (dayjs(dayjs()).diff(birth_date, 'year') < 18) {
      throw new AppError("ERR_MIN_AGE_IS_18", 400);
    }

    const state = await this.statesRepository.findById(state_id);

    if (!state) {
      throw new AppError("ERR_STATE_NOT_FOUND", 404);
    }

    if (calcPercent(balance, 1) > installments_value) {
      throw new AppError("ERR_INSTALLMENTS_MIN_VALUE", 400);
    }

    const installments_times = Math.floor(balance / installments_value);

    const balance_with_interest = balance + (calcPercent(balance, state.interest) * installments_times);
    console.log("CARALHO: ==============", Number(balance_with_interest.toFixed(2)))

    /* armazenar a taxa de juros atual pois ela pode ser alterada conforme o tempo */

    await this.loansRepository.create({
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
  }
}
export { CreateLoanUseCase }