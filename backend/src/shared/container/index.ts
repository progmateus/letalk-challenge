import { container } from "tsyringe";
import { ILoansRepository } from "../../modules/loan/repositories/ILoansRepository";
import { LoansRepository } from "../../modules/loan/infra/sequelize/repositories/LoansRepository";
import { Statesrepository } from "../../modules/loan/infra/sequelize/repositories/StatesRepository";
import { IStatesRepository } from "../../modules/loan/repositories/IStatesRepository";

container.registerSingleton<ILoansRepository>(
  "LoansRepository",
  LoansRepository
);

container.registerSingleton<IStatesRepository>(
  "StatesRepository",
  Statesrepository
);