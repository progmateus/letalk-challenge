import { ICreateLoanDTO } from "../dtos/ICreateLoanDTO";
import { Loan } from "../infra/sequelize/models/Loan";

interface ILoansRepository {
  create(data: ICreateLoanDTO): Promise<Loan>;
  findById(id: number): Promise<Loan>
}

export { ILoansRepository }