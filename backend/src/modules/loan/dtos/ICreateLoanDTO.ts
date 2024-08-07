interface ICreateLoanDTO {
  cpf: string;
  state_id: number;
  birth_date: string;
  balance: number;
  installments_value: number
  installments_times: number;
  maturity_date: Date;
  balance_with_interest?: number;
  current_interest?: number;
}

export { ICreateLoanDTO }