import sequelize from "../../../../../database";
import { Repository } from "sequelize-typescript";
import { State } from "../models/State";
import { IStatesRepository } from "../../../repositories/IStatesRepository";

class Statesrepository implements IStatesRepository {
  private repository: Repository<State>

  constructor() {
    this.repository = sequelize.getRepository(State)
  }
  list(): Promise<State[]> {
    return this.repository.findAll();
  }
  async findById(id: number): Promise<State> {
    return this.repository.findByPk(id);
  }
}
export { Statesrepository }