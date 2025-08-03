# This script clears the migrations folder and the database.
# It is useful for resetting the development environment.

rm -rf migrations/*
echo "✅ Migrations folder cleared."

# Clear the current `schema.ts`
rm -f src/db/schema.ts
echo "✅ Schema file cleared."

# Re-add the schema
touch src/db/schema.ts
echo "✅ Schema file re-added."

# Print that everything is now ready
echo "✅ All done! Your development environment is ready."
echo "📝 Don't forget to run 'bun run create:migration' to create a new migration after setting up your 'schema.ts'."
echo "📝 Run 'bun run create:auth:migration' if any changes were done to 'auth.ts'!"
echo "📝 Make sure your '.env' file is set so that the application can work as intended."
