import { ISimulateLoanDTO } from "@/dtos/ILoanDTO"
import { api } from "./api"

export function ListStatesService() {
  return api({
    url: '/states',
    method: 'get'
  })
}