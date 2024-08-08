import { IStateDTO } from "./IStateDTO";

export interface ILOanDTO {
  id: number;
  cpf: string;
  state_id: number;
  state: IStateDTO;
  birth_date: string;
  balance: number;
  balance_with_interest: number;
  current_interest: string;
  installments_value: number;
  installments_times: number;
  maturity_date: Date;
  created_at: Date;
  updated_at: Date;
}