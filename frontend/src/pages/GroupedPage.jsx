import React, { useEffect, useState } from "react";
import { PageTitle, Card, Spinner, EmptyState } from "../components/ui";

const BASE_URL = "https://inventory-search-lx2h.onrender.com"; // 🔥 CHANGE THIS

export default function GroupedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/inventory/grouped`)
      .then(res => res.json())
      .then(d => {
        setData(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <PageTitle>
        <h1>Grouped Inventory</h1>
      </PageTitle>

      {loading && <Spinner />}

      {!loading && data.length === 0 && <EmptyState>No data</EmptyState>}

      {data.map(group => (
        <Card key={group.supplier_id}>
          <h3>{group.supplier_name}</h3>
          <p>Total Value: ₹{group.total_value}</p>
        </Card>
      ))}
    </div>
  );
}