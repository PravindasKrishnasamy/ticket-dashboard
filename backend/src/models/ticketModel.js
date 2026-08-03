const { query } = require('../config/db');

// All SQL lives here so controllers stay free of raw queries. Assumes a
// `tickets` table matching the shape defined in Step 3's schema.sql:
//   id, title, description, category, priority, status,
//   requester_name, requester_email, assigned_to, created_at, updated_at

const BASE_COLUMNS = `
  id, title, description, category, priority, status,
  requester_name, requester_email, assigned_to, created_at, updated_at
`;

/**
 * List tickets, optionally filtered by status, priority, and a free-text
 * search across title + requester name.
 */
const findAll = async ({ status, priority, search } = {}) => {
  const clauses = [];
  const values = [];

  if (status) {
    values.push(status);
    clauses.push(`status = $${values.length}`);
  }

  if (priority) {
    values.push(priority);
    clauses.push(`priority = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    clauses.push(`(title ILIKE $${values.length} OR requester_name ILIKE $${values.length})`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';

  const result = await query(
    `SELECT ${BASE_COLUMNS} FROM tickets ${where} ORDER BY created_at DESC`,
    values
  );

  return result.rows;
};

const findById = async (id) => {
  const result = await query(`SELECT ${BASE_COLUMNS} FROM tickets WHERE id = $1`, [id]);
  return result.rows[0] || null;
};

const create = async (ticket) => {
  const {
    title,
    description = null,
    category,
    priority,
    status = 'Open',
    requester_name: requesterName,
    requester_email: requesterEmail,
    assigned_to: assignedTo = null,
  } = ticket;

  const result = await query(
    `INSERT INTO tickets
      (title, description, category, priority, status, requester_name, requester_email, assigned_to)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING ${BASE_COLUMNS}`,
    [title, description, category, priority, status, requesterName, requesterEmail, assignedTo]
  );

  return result.rows[0];
};

const updateById = async (id, ticket) => {
  const {
    title,
    description,
    category,
    priority,
    status,
    requester_name: requesterName,
    requester_email: requesterEmail,
    assigned_to: assignedTo,
  } = ticket;

  const result = await query(
    `UPDATE tickets SET
       title = $1,
       description = $2,
       category = $3,
       priority = $4,
       status = $5,
       requester_name = $6,
       requester_email = $7,
       assigned_to = $8,
       updated_at = NOW()
     WHERE id = $9
     RETURNING ${BASE_COLUMNS}`,
    [title, description, category, priority, status, requesterName, requesterEmail, assignedTo, id]
  );

  return result.rows[0] || null;
};

const removeById = async (id) => {
  const result = await query('DELETE FROM tickets WHERE id = $1 RETURNING id', [id]);
  return result.rows[0] || null;
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  removeById,
};
