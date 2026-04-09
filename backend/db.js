const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, 'zeerostock.db');

// ✅ Create DB
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('DB Error:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// ✅ Enable foreign keys
db.run(`PRAGMA foreign_keys = ON`);

// ✅ Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      supplier_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'General',
      quantity INTEGER NOT NULL CHECK(quantity >= 0),
      price REAL NOT NULL CHECK(price > 0),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
    )
  `);
});

// ✅ Seed data (only if empty)
db.get(`SELECT COUNT(*) as count FROM suppliers`, (err, row) => {
  if (err) {
    console.error(err.message);
    return;
  }

  if (row.count === 0) {
    const uuidv4 = () => crypto.randomUUID();

    const suppliers = [
      { id: uuidv4(), name: 'TechSurplus Co.', city: 'Mumbai' },
      { id: uuidv4(), name: 'GreenGoods Ltd.', city: 'Delhi' },
      { id: uuidv4(), name: 'MegaStock Inc.', city: 'Bangalore' },
      { id: uuidv4(), name: 'QuickDeal Traders', city: 'Chennai' },
    ];

    const inventory = [
      { product_name: 'Intel Core i7 Processor', category: 'Electronics', quantity: 150, price: 8500 },
      { product_name: 'Samsung 4K Monitor 27"', category: 'Electronics', quantity: 45, price: 22000 },
      { product_name: 'Mechanical Keyboard RGB', category: 'Electronics', quantity: 200, price: 3200 },
      { product_name: 'Organic Cotton T-Shirts', category: 'Apparel', quantity: 500, price: 450 },
      { product_name: 'Denim Jeans Surplus Pack', category: 'Apparel', quantity: 300, price: 1200 },
      { product_name: 'Woolen Scarves Lot', category: 'Apparel', quantity: 180, price: 650 },
      { product_name: 'Industrial Steel Bolts M8', category: 'Hardware', quantity: 10000, price: 12 },
      { product_name: 'Power Drill 800W', category: 'Hardware', quantity: 75, price: 4500 },
      { product_name: 'Safety Helmets Yellow', category: 'Safety', quantity: 400, price: 380 },
      { product_name: 'Wireless Earbuds Pro', category: 'Electronics', quantity: 320, price: 2800 },
      { product_name: 'USB-C Charging Cables 2m', category: 'Electronics', quantity: 1000, price: 280 },
      { product_name: 'Leather Office Chair', category: 'Furniture', quantity: 60, price: 12500 },
      { product_name: 'Laptop Stand Aluminium', category: 'Furniture', quantity: 90, price: 1800 },
      { product_name: 'Yoga Mats Premium', category: 'Sports', quantity: 250, price: 900 },
      { product_name: 'Stainless Water Bottles', category: 'Sports', quantity: 600, price: 350 },
    ];

    // Insert suppliers
    suppliers.forEach(s => {
      db.run(
        `INSERT INTO suppliers (id, name, city) VALUES (?, ?, ?)`,
        [s.id, s.name, s.city]
      );
    });

    // Insert inventory
    inventory.forEach((item, i) => {
      db.run(
        `INSERT INTO inventory (id, supplier_id, product_name, category, quantity, price)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(),
          suppliers[i % suppliers.length].id,
          item.product_name,
          item.category,
          item.quantity,
          item.price
        ]
      );
    });

    console.log('✅ Database seeded');
  }
});

module.exports = db;