import { AppConfiguration } from "./types/config";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let config = JSON.parse(fs.readFileSync("../config.json", { encoding: "utf-8" }));

config = AppConfiguration.check(config);

console.log("Config validation succeeded");

export default config;
