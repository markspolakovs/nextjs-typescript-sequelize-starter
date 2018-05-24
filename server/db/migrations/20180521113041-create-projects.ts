import * as DBM from "db-migrate-base";
import * as PG from "db-migrate-pg";

export const up = (db: PG.PgDriver, callback: DBM.CallbackFunction) => {
    db.createTable("Projects", {
        id: { type: "int", primaryKey: true },
        name: { type: "string" },
        slug: { type: "string" },
        createdAt: { type: "date" },
        updatedAt: { type: "date" },
        deletedAt: { type: "date" },
    }, callback);
};

export const down = (db: PG.PgDriver, callback: DBM.CallbackFunction) => {
    db.dropTable("Projects", callback);
};

export const _meta = {
    version: "1"
};
