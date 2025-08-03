import { MigrationConfig } from "drizzle-orm/migrator";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./migrations",
};

export async function runMigrations(
  db: NodePgDatabase<Record<string, unknown>>
) {
  // Pass your Drizzle instance (db) and the migration configuration.
  // This configuration should align with your drizzle config file.
  await migrate(db, migrationConfig);
}
