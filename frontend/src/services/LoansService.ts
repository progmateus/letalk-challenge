import { ISimulateLoanDTO } from "@/dtos/ISimulateLoanDTO"
import { api } from "./api"

export function SimulateLoanService(data: ISimulateLoanDTO) {
  return api({
    url: '/loans/simulate',
    method: 'post',
    data
  })
}

export function CreateLoansService(data: ISimulateLoanDTO) {
  return api({
    url: '/loans',
    method: 'post',
    data
  })
}