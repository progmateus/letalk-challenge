
import { SequelizeOptions, Sequelize } from "sequelize-typescript";
import dbConfig from "../config/config"
import { Loan } from "../modules/loan/infra/sequelize/models/Loan";
import { State } from "../modules/loan/infra/sequelize/models/State";

const dbOptions = <SequelizeOptions>dbConfig;
dbOptions.dialectModule = require("pg")

const sequelize = new Sequelize(dbOptions);

const models = [
  Loan,
  State
];

sequelize.addModels(models);

export default sequelize;
