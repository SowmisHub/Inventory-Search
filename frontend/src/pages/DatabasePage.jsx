import React, { useState } from "react";
import { PageTitle, Card, Input, Button, Alert } from "../components/ui";

const BASE_URL = "https://inventory-search-lx2h.onrender.com"; 

export default function DatabasePage() {
  const [supplier, setSupplier] = useState({ name: "", city: "" });
  const [inventory, setInventory] = useState({
    supplier_id: "",
    product_name: "",
    quantity: "",
    price: ""
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const addSupplier = async () => {
    setMsg("");
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/supplier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error");

      setMsg("Supplier added successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const addInventory = async () => {
    setMsg("");
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inventory,
          quantity: Number(inventory.quantity),
          price: Number(inventory.price)
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error");

      setMsg("Inventory added successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <PageTitle>
        <h1>Manage Data</h1>
      </PageTitle>

      <Card>
        <h3>Add Supplier</h3>

        <Input
          placeholder="Name"
          onChange={e => setSupplier({ ...supplier, name: e.target.value })}
        />

        <Input
          placeholder="City"
          onChange={e => setSupplier({ ...supplier, city: e.target.value })}
        />

        <Button onClick={addSupplier}>Add Supplier</Button>
      </Card>

      <Card>
        <h3>Add Inventory</h3>

        <Input
          placeholder="Supplier ID"
          onChange={e => setInventory({ ...inventory, supplier_id: e.target.value })}
        />

        <Input
          placeholder="Product"
          onChange={e => setInventory({ ...inventory, product_name: e.target.value })}
        />

        <Input
          placeholder="Quantity"
          type="number"
          onChange={e => setInventory({ ...inventory, quantity: e.target.value })}
        />

        <Input
          placeholder="Price (> 0)"
          type="number"
          onChange={e => setInventory({ ...inventory, price: e.target.value })}
        />

        <Button onClick={addInventory}>Add Inventory</Button>
      </Card>

      {msg && <Alert>{msg}</Alert>}
      {error && <Alert>{error}</Alert>}
    </div>
  );
}