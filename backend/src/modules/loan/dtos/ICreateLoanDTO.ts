interface ICreateLoanDTO {
  cpf: string;
  state_id: number;
  birth_date: string;
  balance: number;
  interest: number;
  installments_value: number
  installments_times: number;
  maturity_date: Date;
}

export { ICreateLoanDTO }