const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const db = require('./db');

const uuidv4 = () => crypto.randomUUID();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ---------------- SEARCH ---------------- */
app.get('/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;

  let query = `
    SELECT i.*, s.name as supplier_name
    FROM inventory i
    JOIN suppliers s ON i.supplier_id = s.id
    WHERE 1=1
  `;
  const params = [];

  if (q) {
    query += ` AND LOWER(i.product_name) LIKE LOWER(?)`;
    params.push(`%${q}%`);
  }

  if (category) {
    query += ` AND LOWER(i.category) = LOWER(?)`;
    params.push(category);
  }

  if (minPrice) {
    query += ` AND i.price >= ?`;
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    query += ` AND i.price <= ?`;
    params.push(Number(maxPrice));
  }

  const results = db.prepare(query).all(...params);
  res.json({ results });
});

/* ---------------- SUPPLIER ---------------- */
app.post('/supplier', (req, res) => {
  const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: "Name & city required" });
  }

  const id = uuidv4();

  db.prepare(
    `INSERT INTO suppliers (id, name, city) VALUES (?, ?, ?)`
  ).run(id, name, city);

  res.json({ message: "Supplier added", id });
});

/* ---------------- INVENTORY ---------------- */
app.post('/inventory', (req, res) => {
  const { supplier_id, product_name, category, quantity, price } = req.body;

  if (!supplier_id || !product_name) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (quantity < 0 || price <= 0) {
    return res.status(400).json({ error: "Invalid values" });
  }

  const exists = db.prepare(
    `SELECT id FROM suppliers WHERE id = ?`
  ).get(supplier_id);

  if (!exists) {
    return res.status(400).json({ error: "Invalid supplier" });
  }

  const id = uuidv4();

  db.prepare(`
    INSERT INTO inventory 
    (id, supplier_id, product_name, category, quantity, price)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, supplier_id, product_name, category || "General", quantity, price);

  res.json({ message: "Inventory added" });
});

/* ---------------- GET INVENTORY ---------------- */
app.get('/inventory', (req, res) => {
  const items = db.prepare(`
    SELECT i.*, s.name as supplier_name
    FROM inventory i
    JOIN suppliers s ON i.supplier_id = s.id
  `).all();

  res.json({ items });
});

/* ---------------- GROUPED ---------------- */
app.get('/inventory/grouped', (req, res) => {
  const rows = db.prepare(`
    SELECT 
      s.id as supplier_id,
      s.name as supplier_name,
      SUM(i.quantity * i.price) as total_value
    FROM suppliers s
    LEFT JOIN inventory i ON s.id = i.supplier_id
    GROUP BY s.id
    ORDER BY total_value DESC
  `).all();

  res.json(rows);
});

/* ---------------- START ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});