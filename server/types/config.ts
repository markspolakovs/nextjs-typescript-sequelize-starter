import * as t from "runtypes";

const EnvDatabaseConfiguration = t.Record({
    database: t.String,
    host: t.String,
    username: t.String,
    password: t.String
});

const DatabaseConfiguration = t.Partial({
    development: EnvDatabaseConfiguration,
    test: EnvDatabaseConfiguration,
    production: EnvDatabaseConfiguration,
});

export const AppConfiguration = t.Record({
    env: t.String,
    database: DatabaseConfiguration
});
