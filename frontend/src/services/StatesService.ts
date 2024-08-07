import { ISimulateLoanDTO } from "@/dtos/ILoanDTO"
import { api } from "./api"

export function ListStatesService(data: ISimulateLoanDTO) {
  return api({
    url: '/states',
    method: 'get',
    data
  })
}