import { LoansRepositoryInMemory } from "../../repositories/in-memory/LoansRepositoryInMemory";
import { StatesRepositoryInMemory } from "../../repositories/in-memory/StatesRepositoryInMemory";
import { ListLoansUseCase } from "./ListLoansUseCase";



let loansRepositoryInMemory: LoansRepositoryInMemory;
let statesrepositoryInMemory: StatesRepositoryInMemory;
let listLoansUseCase: ListLoansUseCase;



describe("List Loans", () => {

  beforeEach(() => {
    loansRepositoryInMemory = new LoansRepositoryInMemory();
    listLoansUseCase = new ListLoansUseCase(
      loansRepositoryInMemory
    );
  })

  it("Should be able to list all loans", async () => {

    const state = await statesrepositoryInMemory.create("RJ", 1.8)

    const loan = await loansRepositoryInMemory.create({
      balance: 50000,
      birth_date: "2000-08-06T23:43:08.239Z",
      cpf: "40086860020",
      installments_times: 5,
      installments_value: 500,
      maturity_date: new Date("2000-08-06T23:43:08.239Z"),
      state_id: state.id,
      balance_with_interest: 5500,
      current_interest: state.interest
    })

    const loans = await listLoansUseCase.execute();

    expect(loans).toEqual([loan]);
  })


})