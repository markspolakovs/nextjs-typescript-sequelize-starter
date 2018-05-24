import * as fs from "fs-extra";
import * as path from "path";

const MIGRATION_TEMPLATE = `import * as DBM from "db-migrate-base";
import * as PG from "db-migrate-pg";

export const up = (db: PG.PgDriver, callback: DBM.CallbackFunction) => {
    
};

export const down = (db: PG.PgDriver, callback: DBM.CallbackFunction) => {
    
};

export const _meta = {
    version: "1"
};
`;

function pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

(async () => {
  const name = process.argv[2];

  if (!name) {
    console.error("No name given.");
    process.exit(1);
  }

  const date = new Date();

  const fileName = [
    pad(date.getFullYear(), 4),
    pad(date.getMonth() + 1, 2),
    pad(date.getDate(), 2),
    pad(date.getUTCHours(), 2),
    pad(date.getUTCMinutes(), 2),
    pad(date.getUTCSeconds(), 2),
    "-",
    name,
    ".ts"
  ].join("");

  try {
    await fs.writeFile(path.join("server", "db", "migrations", fileName), MIGRATION_TEMPLATE, { encoding: "utf-8" });
  } catch (e) {
      console.error("Error writing file: " + e);
      process.exit(1);
  }

  console.log(`New migration created: ${fileName}`);
  process.exit(0);
})();
