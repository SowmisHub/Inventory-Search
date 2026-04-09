const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uuidv4 = () => crypto.randomUUID();

/* ---------------- SUPPLIERS ---------------- */

const suppliers = [
  { id: uuidv4(), name: 'TechSurplus Co.', city: 'Mumbai' },
  { id: uuidv4(), name: 'GreenGoods Ltd.', city: 'Delhi' },
  { id: uuidv4(), name: 'MegaStock Inc.', city: 'Bangalore' },
  { id: uuidv4(), name: 'QuickDeal Traders', city: 'Chennai' },
];

/* ---------------- INVENTORY (FULL DATA) ---------------- */

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

/* ---------------- SEARCH ---------------- */
app.get('/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;

  let results = inventory.map(item => {
    const supplier = suppliers.find(s => s.id === item.supplier_id);
    return { ...item, supplier_name: supplier?.name };
  });

  if (q) {
    results = results.filter(item =>
      item.product_name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    results = results.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    results = results.filter(item => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter(item => item.price <= Number(maxPrice));
  }

  res.json(results);
});

/* ---------------- ADD SUPPLIER ---------------- */
app.post('/supplier', (req, res) => {
  const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: "Name & city required" });
  }

  const newSupplier = {
    id: uuidv4(),
    name,
    city
  };

  suppliers.push(newSupplier);

  res.json({ message: "Supplier added", supplier: newSupplier });
});

/* ---------------- ADD INVENTORY ---------------- */
app.post('/inventory', (req, res) => {
  const { supplier_id, product_name, category, quantity, price } = req.body;

  if (!supplier_id || !product_name) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (quantity < 0 || price <= 0) {
    return res.status(400).json({ error: "Invalid values" });
  }

  const supplierExists = suppliers.find(s => s.id === supplier_id);

  if (!supplierExists) {
    return res.status(400).json({ error: "Invalid supplier" });
  }

  const newItem = {
    id: uuidv4(),
    supplier_id,
    product_name,
    category: category || "General",
    quantity,
    price
  };

  inventory.push(newItem);

  res.json({ message: "Inventory added", item: newItem });
});

/* ---------------- GET INVENTORY ---------------- */
app.get('/inventory', (req, res) => {
  const items = inventory.map(item => {
    const supplier = suppliers.find(s => s.id === item.supplier_id);
    return { ...item, supplier_name: supplier?.name };
  });

  res.json(items);
});

/* ---------------- GROUPED ---------------- */
app.get('/inventory/grouped', (req, res) => {
  const grouped = suppliers.map(supplier => {
    const items = inventory.filter(i => i.supplier_id === supplier.id);

    const total_value = items.reduce(
      (sum, item) => sum + (item.quantity * item.price),
      0
    );

    return {
      supplier_id: supplier.id,
      supplier_name: supplier.name,
      total_value
    };
  });

  grouped.sort((a, b) => b.total_value - a.total_value);

  res.json(grouped);
});

/* ---------------- START ---------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});