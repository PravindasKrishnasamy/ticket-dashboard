const { Pool } = require('pg');

// Minimal connection pool so the model layer has something to query against
// while the app is being built. The full schema (Step 3) and any production
// hardening (SSL for RDS, retry/backoff, connection limits tuned for the
// EKS deployment) will build on top of this.
const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT) || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'ticketflow',
      ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool(connectionConfig);

pool.on('error', (err) => {
  // Unexpected errors on idle clients in the pool (e.g. DB restarted).
  // eslint-disable-next-line no-console
  console.error('Unexpected Postgres pool error', err);
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
