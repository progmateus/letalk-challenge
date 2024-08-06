import { ICreateLoanDTO } from "../dtos/ICreateLoanDTO";
import { Loan } from "../infra/sequelize/models/Loan";

interface ILoansRepository {
  create(data: ICreateLoanDTO): Promise<void>;
  findById(id: string): Promise<Loan>
}

export { ILoansRepository }