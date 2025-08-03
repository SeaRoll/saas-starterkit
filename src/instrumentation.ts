export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      // import the necessary modules
      const db = await import("@/db/db").then((mod) => mod.db);
      const runMigrations = await import("@/db/migrations").then(
        (mod) => mod.runMigrations
      );

      // run migrations
      console.log("⚙️  Running migrations...");
      await runMigrations(db);
      console.log("✅ Migrations completed successfully.");
    } catch (error) {
      console.error("❌ Error during instrumentation:", error);
    }

    // run background tasks
    const { runTasks } = await import("./tasks");
    runTasks();
  } else {
    console.warn("⚠️ Instrumentation is only supported in Node.js runtime.");
  }
}
