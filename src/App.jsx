import { useEffect, useState } from "react";
import data from "./jomato.json";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [area, setArea] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState(0);
  const [maxCost, setMaxCost] = useState(0);

  useEffect(() => {
    setRestaurants(data);
  }, []);

  const cuisines = Array.from(
    new Set(
      data.flatMap((r) => r.cuisines || [])
    )
  ).sort();

  const areas = Array.from(
    new Set(
      data.map((r) => r.area).filter(Boolean)
    )
  ).sort();

  const filtered = restaurants.filter((r) => {
    const matchesSearch =
      !search ||
      (r.name || "").toLowerCase().includes(search.toLowerCase());

    const matchesCuisine =
      !cuisine || (r.cuisines || []).includes(cuisine);

    const matchesArea = !area || r.area === area;

    const matchesRating =
      !minRating || (Number(r.rating) || 0) >= minRating;

    const matchesDeliveryTime =
      !maxDeliveryTime ||
      (r.deliveryTime == null
        ? true
        : Number(r.deliveryTime) <= maxDeliveryTime);

    const matchesCost =
      !maxCost ||
      (r.averageCost == null
        ? true
        : Number(r.averageCost) <= maxCost);

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesArea &&
      matchesRating &&
      matchesDeliveryTime &&
      matchesCost
    );
  });

  return (
    <div
  style={{
    background: "#050510",
    color: "#f5f5f5",
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    padding: "1rem",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  }}
>

      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>Jomato</h1>
        <p style={{ margin: 0, color: "#cfcfe0" }}>
          Find yummy places to eat from our big list.
        </p>
      </header>

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #333",
            minWidth: "160px",
          }}
        />

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #333",
            minWidth: "160px",
          }}
        >
          <option value="">All cuisines</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #333",
            minWidth: "160px",
          }}
        >
          <option value="">All areas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #333",
            minWidth: "140px",
          }}
        >
          <option value={0}>Any rating</option>
          <option value={3}>3.0+</option>
          <option value={3.5}>3.5+</option>
          <option value={4}>4.0+</option>
        </select>

        <input
          type="number"
          placeholder="Max delivery time (mins)"
          value={maxDeliveryTime || ""}
          onChange={(e) => setMaxDeliveryTime(Number(e.target.value) || 0)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #333",
            minWidth: "180px",
          }}
        />

        <input
          type="number"
          placeholder="Max average cost"
          value={maxCost || ""}
          onChange={(e) => setMaxCost(Number(e.target.value) || 0)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #333",
            minWidth: "180px",
          }}
        />
      </section>

      <main
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {filtered.map((r) => (
          <article
            key={r.id}
            style={{
              background: "#161622",
              padding: "1rem",
              borderRadius: "10px",
              border: "1px solid #26263a",
            }}
          >
            <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.1rem" }}>
              {r.name}
            </h2>
            <p style={{ margin: "0 0 0.25rem 0", color: "#c0c0d8" }}>
              {r.type} • {r.area}
            </p>
            <p style={{ margin: "0 0 0.25rem 0", color: "#c0c0d8" }}>
              {(r.cuisines || []).join(", ")}
            </p>
            <p style={{ margin: "0.25rem 0", fontWeight: 500 }}>
              ⭐ {r.rating || "N/A"}{" "}
              <span style={{ color: "#a0a0c0" }}>
                ({r.ratingCount} reviews)
              </span>
            </p>
            <p style={{ margin: "0.25rem 0", color: "#c0c0d8" }}>
              Avg cost: ₹{r.averageCost} for two
            </p>
            <p style={{ margin: "0.25rem 0", color: "#c0c0d8" }}>
              Online order: {r.onlineOrder} • Table booking: {r.tableBooking}
            </p>
            <p style={{ margin: "0.25rem 0", color: "#c0c0d8" }}>
              ETA: {r.deliveryTime} mins
            </p>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
