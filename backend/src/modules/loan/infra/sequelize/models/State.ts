import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table
class State extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  uf: string;

  @Column
  interest: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
export { State }