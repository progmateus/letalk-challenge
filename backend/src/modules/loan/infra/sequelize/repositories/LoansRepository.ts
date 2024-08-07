import { ILoansRepository } from "../../../repositories/ILoansRepository";
import sequelize from "../../../../../database";
import { Loan } from "../models/Loan";
import { Repository } from "sequelize-typescript";
import { ICreateLoanDTO } from "../../../dtos/ICreateLoanDTO";

class LoansRepository implements ILoansRepository {
  private repository: Repository<Loan>

  constructor() {
    this.repository = sequelize.getRepository(Loan)
  }
  async create({ balance, birth_date, cpf, installments_times, installments_value, balance_with_interest, current_interest, maturity_date, state_id }: ICreateLoanDTO): Promise<void> {
    await this.repository.create({
      balance, birth_date, cpf, installments_times, installments_value, balance_with_interest, current_interest, maturity_date, state_id
    })
  }
  async findById(id: string): Promise<Loan> {
    return this.repository.findByPk(id);
  }

}
export { LoansRepository }