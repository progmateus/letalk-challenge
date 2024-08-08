import { AppError } from "../../../../errors/AppError";
import { LoansRepositoryInMemory } from "../../repositories/in-memory/LoansRepositoryInMemory";
import { StatesRepositoryInMemory } from "../../repositories/in-memory/StatesRepositoryInMemory";
import { CreateLoanUseCase } from "./CreateLoanUseCase";



let loansRepositoryInMemory: LoansRepositoryInMemory;
let statesrepositoryInMemory: StatesRepositoryInMemory;
let createLoanUseCase: CreateLoanUseCase;



describe("Create Loan", () => {

  beforeEach(() => {
    loansRepositoryInMemory = new LoansRepositoryInMemory();
    createLoanUseCase = new CreateLoanUseCase(
      loansRepositoryInMemory,
      statesrepositoryInMemory
    );
  })

  it("Should be able to create a new Loan", async () => {
    const stateCreated = await statesrepositoryInMemory.create("RJ", 5);

    const loan = {
      balance: 50000.9865478653211,
      birth_date: "2000-08-06T23:43:08.239Z",
      cpf: "400.868.600-20",
      state_id: stateCreated.id,
      installments_value: 15000
    }

    const loanCreated = await createLoanUseCase.execute({
      balance: loan.balance,
      birth_date: loan.birth_date,
      cpf: loan.cpf,
      state_id: loan.state_id,
      installments_value: loan.installments_value
    })

    const verifyLoanCreated = await loansRepositoryInMemory.findById(loanCreated.id);
    expect(verifyLoanCreated).toHaveProperty("id");
  })

  it("Should not be able to create a loan with a non existent state", async () => {
    expect(async () => {
      const loan = {
        balance: 50000.9865478653211,
        birth_date: "2000-08-06T23:43:08.239Z",
        cpf: "400.868.600-20",
        state_id: 2,
        installments_value: 15000
      }

      await createLoanUseCase.execute({
        balance: loan.balance,
        birth_date: loan.birth_date,
        cpf: loan.cpf,
        state_id: loan.state_id,
        installments_value: loan.installments_value
      })
    }).rejects.toBeInstanceOf(AppError)
  })


  it("Should not be able to create a loan with a invalid CPF", async () => {
    expect(async () => {
      const stateCreated = await statesrepositoryInMemory.create("RJ", 5);
      const loan = {
        balance: 50000.9865478653211,
        birth_date: "2000-08-06T23:43:08.239Z",
        cpf: "4569856",
        state_id: stateCreated.id,
        installments_value: 15000
      }

      await createLoanUseCase.execute({
        balance: loan.balance,
        birth_date: loan.birth_date,
        cpf: loan.cpf,
        state_id: loan.state_id,
        installments_value: loan.installments_value
      })
    }).rejects.toBeInstanceOf(AppError)
  })




})