import { ISimulateLoanDTO } from "@/dtos/ISimulateLoanDTO"
import { api } from "./api"

export function ListStatesService() {
  return api({
    url: '/states',
    method: 'get'
  })
}