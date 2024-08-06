import { State } from "../infra/sequelize/models/State";

interface IStatesRepository {
  findById(id: number): Promise<State>
}

export { IStatesRepository }