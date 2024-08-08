import { StatesRepositoryInMemory } from "../../repositories/in-memory/StatesRepositoryInMemory";
import { ListStatesUseCase } from "./ListStatesUseCase";



let statesrepositoryInMemory: StatesRepositoryInMemory;
let listStatesUseCase: ListStatesUseCase;



describe("Lisat States", () => {

  beforeEach(() => {
    statesrepositoryInMemory = new StatesRepositoryInMemory();
    listStatesUseCase = new ListStatesUseCase(
      statesrepositoryInMemory
    );
  })

  it("Should be able to list all states", async () => {

    const state = await statesrepositoryInMemory.create("RJ", 1.8)

    const states = await listStatesUseCase.execute();

    expect(states).toEqual([state]);
  })


})