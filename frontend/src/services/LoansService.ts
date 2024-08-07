import { ISimulateLoanDTO } from "@/dtos/ILoanDTO"
import { api } from "./api"

export function SimulateLoanService(data: ISimulateLoanDTO) {
  return api({
    url: '/loans/simulate',
    method: 'post',
    data
  })
}