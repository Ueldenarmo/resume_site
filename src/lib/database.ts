const LOCAL_FALLBACK_DATABASE_URI =
  "postgres://postgres:postgres@localhost:5432/portfolio_kisik";

export function getDatabaseUri() {
  return (
    process.env.SUPABASE_DATABASE_URI ||
    process.env.DATABASE_URI ||
    LOCAL_FALLBACK_DATABASE_URI
  );
}

export function hasDatabaseUri() {
  return Boolean(
    process.env.SUPABASE_DATABASE_URI || process.env.DATABASE_URI
  );
}
