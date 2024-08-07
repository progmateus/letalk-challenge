export interface IProspectionDTO {
  id?: number;
  balance: number,
  balance_with_interest: number,
  interest: number,
  installments_value: number,
  installments_times: number,
  maturity_date: Date,
}