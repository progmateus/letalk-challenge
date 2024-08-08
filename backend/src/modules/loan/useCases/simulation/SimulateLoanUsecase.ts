import { inject, injectable } from "tsyringe";
import { ILoansRepository } from "../../repositories/ILoansRepository";
import { ICreateLoanDTO } from "../../dtos/ICreateLoanDTO";
import { AppError } from "../../../../errors/AppError";
import { number, z } from "zod";
import { calcPercent } from "../../../../utils/calcPercent";
import { IStatesRepository } from "../../repositories/IStatesRepository";
import dayjs from "dayjs";
import { isValidCPF } from "../../../../utils/isValidCpf";

const loanSchema = z.object({
  balance: z.number().min(50000),
  state_id: z.number(),
  birth_date: z.string(),
  cpf: z.string(),
  installments_value: z.number().int().positive()
});

interface IResponse {
  currentSimulation: ISimulation
  moreSimulations: ISimulation[]
}

interface ISimulation {
  id?: number;
  balance: number;
  balance_with_interest: number,
  interest: number,
  installments_value: number,
  installments_times: number;
  maturity_date: Date,
}

@injectable()
class SimulateLoanUseCase {
  constructor(
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
  ) { }

  async execute({ balance, birth_date, cpf, state_id, installments_value }: Omit<ICreateLoanDTO, "installments_times" | "maturity_date" | "interest">): Promise<IResponse> {
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

    const moreSimulations = [];

    for (let i = installments_times; i > 0; i--) {
      const balance_with_interest = balance + (calcPercent(balance, state.interest) * i)
      moreSimulations.push({
        id: i,
        balance: balance,
        balance_with_interest,
        interest: calcPercent(balance, state.interest) * i,
        installments_value: Math.floor(balance_with_interest / i),
        installments_times: i,
        maturity_date: dayjs().add(i, "month")
      })
    }

    return {
      currentSimulation: {
        balance,
        balance_with_interest,
        interest: calcPercent(balance, state.interest) * installments_times,
        installments_value: installments_value,
        installments_times: installments_times,
        maturity_date: dayjs().add(installments_times, "month").toDate()
      },
      moreSimulations,
    }
  }
}
export { SimulateLoanUseCase }