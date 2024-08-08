import { ICreateLoanDTO } from "../../dtos/ICreateLoanDTO";
import { Loan } from "../../infra/sequelize/models/Loan";
import { ILoansRepository } from "../ILoansRepository";

class LoansRepositoryInMemory implements ILoansRepository {

  loans: Loan[] = [];


  async list(): Promise<Loan[]> {
    return this.loans
  }
  async create({ balance, birth_date, cpf, installments_times, installments_value, balance_with_interest, current_interest, maturity_date, state_id }: ICreateLoanDTO): Promise<Loan> {
    const loan = new Loan();
    Object.assign(loan, {
      balance, birth_date, cpf, installments_times, installments_value, balance_with_interest, current_interest, maturity_date, state_id
    })

    this.loans.push(loan)

    return loan
  }
  async findById(id: number): Promise<Loan> {
    const loan = this.loans.find(loan => loan.id === id)
    return loan
  }

}
export { LoansRepositoryInMemory };