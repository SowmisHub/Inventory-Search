import React, { useEffect, useState } from "react";
import { PageTitle, Card, Spinner, EmptyState } from "../components/ui";

export default function GroupedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/inventory/grouped")
      .then(res => res.json())
      .then(d => {
        setData(d);
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