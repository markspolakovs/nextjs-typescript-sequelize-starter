import { Sequelize, ISequelizeConfig } from "sequelize-typescript";

import config from "../config";

import Project from "./models/project";

const dbConfig: ISequelizeConfig = Object.assign(
  {},
  config.database[config.env],
  {
    dialect: "postgres"
  }
);

const sequelize = new Sequelize(dbConfig);

sequelize.addModels([
    Project
]);

export { Sequelize, sequelize, Project };
