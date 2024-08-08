import { AfterFind, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { State } from "./State";
import { calcPercent } from "../../../../../utils/calcPercent";

@Table
class Loan extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  cpf: string;

  @ForeignKey(() => State)
  @Column
  state_id: number;

  @BelongsTo(() => State)
  state: State;

  @Column
  birth_date: string;

  @Column
  balance: number;

  @Column
  balance_with_interest: number;

  @Column
  current_interest: string;

  @Column
  installments_value: number;

  @Column
  installments_times: number;

  @Column
  maturity_date: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Default(0)
  @Column(DataType.VIRTUAL)
  interest_value: string | boolean | null;


  @AfterFind
  static async updateInterestValue(instances: any): Promise<void | any> {
    if (!Array.isArray(instances)) return instances;
    const newInstances = await Promise.all(
      instances.map(async (instance: any) => {
        instance.dataValues.interest_value = calcPercent(instance.dataValues.balance, instance.dataValues.current_interest) * instance.dataValues.installments_times;
        return instance;
      })
    );
    return newInstances;
  }
}
export { Loan }