import { ICreateLoanDTO } from "../../dtos/ICreateLoanDTO";
import { Loan } from "../../infra/sequelize/models/Loan";
import { State } from "../../infra/sequelize/models/State";
import { ILoansRepository } from "../ILoansRepository";
import { IStatesRepository } from "../IStatesRepository";

class StatesRepositoryInMemory implements IStatesRepository {
  states: State[] = [];


  async create(uf: string, interest: number): Promise<State> {
    const state = new State();
    Object.assign(state, {
      uf,
      interest
    })

    this.states.push(state)

    return state
  }

  async findById(id: number): Promise<State> {
    const state = this.states.find(loan => loan.id === id);
    return state;
  }
  async list(): Promise<State[]> {
    return this.states;
  }

  loans: Loan[] = [];

}
export { StatesRepositoryInMemory };