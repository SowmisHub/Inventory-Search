const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'zeerostock.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS suppliers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inventory (
    id TEXT PRIMARY KEY,
    supplier_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    quantity INTEGER NOT NULL CHECK(quantity >= 0),
    price REAL NOT NULL CHECK(price > 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
  );

  -- Indexes for fast search
  CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory(product_name COLLATE NOCASE);
  CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category COLLATE NOCASE);
  CREATE INDEX IF NOT EXISTS idx_inventory_price ON inventory(price);
  CREATE INDEX IF NOT EXISTS idx_inventory_supplier ON inventory(supplier_id);
`);

// Seed data if empty
const supplierCount = db.prepare('SELECT COUNT(*) as count FROM suppliers').get();
if (supplierCount.count === 0) {
  const crypto = require('crypto');
  const uuidv4 = () => crypto.randomUUID();

  const suppliers = [
    { id: uuidv4(), name: 'TechSurplus Co.', city: 'Mumbai' },
    { id: uuidv4(), name: 'GreenGoods Ltd.', city: 'Delhi' },
    { id: uuidv4(), name: 'MegaStock Inc.', city: 'Bangalore' },
    { id: uuidv4(), name: 'QuickDeal Traders', city: 'Chennai' },
  ];

  const insertSupplier = db.prepare('INSERT INTO suppliers (id, name, city) VALUES (?, ?, ?)');
  suppliers.forEach(s => insertSupplier.run(s.id, s.name, s.city));

  const inventory = [
    { id: uuidv4(), supplier_id: suppliers[0].id, product_name: 'Intel Core i7 Processor', category: 'Electronics', quantity: 150, price: 8500 },
    { id: uuidv4(), supplier_id: suppliers[0].id, product_name: 'Samsung 4K Monitor 27"', category: 'Electronics', quantity: 45, price: 22000 },
    { id: uuidv4(), supplier_id: suppliers[0].id, product_name: 'Mechanical Keyboard RGB', category: 'Electronics', quantity: 200, price: 3200 },
    { id: uuidv4(), supplier_id: suppliers[1].id, product_name: 'Organic Cotton T-Shirts', category: 'Apparel', quantity: 500, price: 450 },
    { id: uuidv4(), supplier_id: suppliers[1].id, product_name: 'Denim Jeans Surplus Pack', category: 'Apparel', quantity: 300, price: 1200 },
    { id: uuidv4(), supplier_id: suppliers[1].id, product_name: 'Woolen Scarves Lot', category: 'Apparel', quantity: 180, price: 650 },
    { id: uuidv4(), supplier_id: suppliers[2].id, product_name: 'Industrial Steel Bolts M8', category: 'Hardware', quantity: 10000, price: 12 },
    { id: uuidv4(), supplier_id: suppliers[2].id, product_name: 'Power Drill 800W', category: 'Hardware', quantity: 75, price: 4500 },
    { id: uuidv4(), supplier_id: suppliers[2].id, product_name: 'Safety Helmets Yellow', category: 'Safety', quantity: 400, price: 380 },
    { id: uuidv4(), supplier_id: suppliers[3].id, product_name: 'Wireless Earbuds Pro', category: 'Electronics', quantity: 320, price: 2800 },
    { id: uuidv4(), supplier_id: suppliers[3].id, product_name: 'USB-C Charging Cables 2m', category: 'Electronics', quantity: 1000, price: 280 },
    { id: uuidv4(), supplier_id: suppliers[3].id, product_name: 'Leather Office Chair', category: 'Furniture', quantity: 60, price: 12500 },
    { id: uuidv4(), supplier_id: suppliers[0].id, product_name: 'Laptop Stand Aluminium', category: 'Furniture', quantity: 90, price: 1800 },
    { id: uuidv4(), supplier_id: suppliers[1].id, product_name: 'Yoga Mats Premium', category: 'Sports', quantity: 250, price: 900 },
    { id: uuidv4(), supplier_id: suppliers[2].id, product_name: 'Stainless Water Bottles', category: 'Sports', quantity: 600, price: 350 },
  ];

  const insertInventory = db.prepare(
    'INSERT INTO inventory (id, supplier_id, product_name, category, quantity, price) VALUES (?, ?, ?, ?, ?, ?)'
  );
  inventory.forEach(i => insertInventory.run(i.id, i.supplier_id, i.product_name, i.category, i.quantity, i.price));

  console.log('✅ Database seeded with sample data');
}

module.exports = db;
