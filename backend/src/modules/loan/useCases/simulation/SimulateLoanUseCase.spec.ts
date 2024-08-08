import { AppError } from "../../../../errors/AppError";
import { LoansRepositoryInMemory } from "../../repositories/in-memory/LoansRepositoryInMemory";
import { StatesRepositoryInMemory } from "../../repositories/in-memory/StatesRepositoryInMemory";
import { SimulateLoanUseCase } from "./SimulateLoanUsecase";



let statesrepositoryInMemory: StatesRepositoryInMemory;
let simulateLoanUseCase: SimulateLoanUseCase;



describe("simulate a Loan", () => {

  beforeEach(() => {
    simulateLoanUseCase = new SimulateLoanUseCase(
      statesrepositoryInMemory
    );
  })

  it("Should be able to simulate a Loan", async () => {
    const stateCreated = await statesrepositoryInMemory.create("RJ", 5);

    const simulationRequest = {
      balance: 50000.9865478653211,
      birth_date: "30/09/2000",
      cpf: "40086860020",
      state_id: stateCreated.id,
      installments_value: 15000
    }

    const simulation = await simulateLoanUseCase.execute({
      balance: simulationRequest.balance,
      birth_date: simulationRequest.birth_date,
      cpf: simulationRequest.cpf,
      state_id: simulationRequest.state_id,
      installments_value: simulationRequest.installments_value
    })

    expect(simulation).toHaveProperty("currentSimulation");
  })

  it("Should not be able to simulate a loan with a non existent state", async () => {
    expect(async () => {
      const simulationRequest = {
        balance: 50000.9865478653211,
        birth_date: "2000-08-06T23:43:08.239Z",
        cpf: "400.868.600-20",
        state_id: 2,
        installments_value: 15000
      }

      await simulateLoanUseCase.execute({
        balance: simulationRequest.balance,
        birth_date: simulationRequest.birth_date,
        cpf: simulationRequest.cpf,
        state_id: simulationRequest.state_id,
        installments_value: simulationRequest.installments_value
      })
    }).rejects.toBeInstanceOf(AppError)
  })


  it("Should not be able to simulate a loan with a invalid CPF", async () => {
    expect(async () => {
      const stateCreated = await statesrepositoryInMemory.create("RJ", 5);
      const simulationRequest = {
        balance: 50000.9865478653211,
        birth_date: "2000-08-06T23:43:08.239Z",
        cpf: "4569856",
        state_id: stateCreated.id,
        installments_value: 15000
      }

      await simulateLoanUseCase.execute({
        balance: simulationRequest.balance,
        birth_date: simulationRequest.birth_date,
        cpf: simulationRequest.cpf,
        state_id: simulationRequest.state_id,
        installments_value: simulationRequest.installments_value
      })
    }).rejects.toBeInstanceOf(AppError)
  })




})