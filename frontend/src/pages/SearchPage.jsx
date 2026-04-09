import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PageTitle, Card, Input, Button,
  Spinner, Tag, EmptyState, Alert
} from "../components/ui";

const Grid = styled.div`
  display: grid;
  gap: 10px;
`;

const BASE_URL = "https://inventory-search-lx2h.onrender.com"; // 🔥 CHANGE THIS

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError("Min price cannot be greater than max price");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const res = await fetch(`${BASE_URL}/search?${params}`);
      const data = await res.json();

      // ✅ FIX HERE
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Search failed");
    }

    setLoading(false);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <PageTitle>
        <h1>Search Inventory</h1>
      </PageTitle>

      <Card>
        <Input
          placeholder="Search..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />

        <Button onClick={search}>Search</Button>

        {error && <Alert>{error}</Alert>}
      </Card>

      {loading && <Spinner />}

      {!loading && results.length === 0 && <EmptyState>No results</EmptyState>}

      <Grid>
        {results.map(item => (
          <Card key={item.id}>
            <h3>{item.product_name}</h3>
            <Tag>{item.category}</Tag>
            <p>₹{item.price}</p>
          </Card>
        ))}
      </Grid>
    </div>
  );
}