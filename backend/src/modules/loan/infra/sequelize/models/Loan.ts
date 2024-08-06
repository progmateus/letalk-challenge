import { AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { State } from "./State";

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
  balance: string;

  @Column
  current_interest: string;

  @Column
  balance_with_interest: string;

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
}
export { Loan }