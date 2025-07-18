import React, { useState, useEffect } from "react";
import SafeRouteMap from "../SafeRouteMap";
import axios from "axios";

interface Coordinates {
  lat: number;
  lng: number;
}

const SafeRoutePage = () => {
  const [sourceCoords, setSourceCoords] = useState<Coordinates | null>(null);
  const [destCoords, setDestCoords] = useState<Coordinates | null>(null);
  const [routeCoords, setRouteCoords] = useState<Coordinates[]>([]);

  const handleRouteGenerate = async () => {
    const source = { lat: 19.055, lng: 72.835 }; // Bandra
    const dest = { lat: 19.089, lng: 72.882 };  // Kurla
    setSourceCoords(source);
    setDestCoords(dest);

    try {
      const response = await axios.post("http://localhost:8000/api/safe-route", {
        source,
        destination: dest,
      });
      const coords = response.data.route.map(([lng, lat]) => ({ lat, lng }));
      setRouteCoords(coords);
    } catch (error) {
      console.error("Failed to fetch route:", error);
    }
  };

  useEffect(() => {
    handleRouteGenerate(); // Auto-load route
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Safe Route Planner</h1>
      <SafeRouteMap
        sourceCoords={sourceCoords}
        destCoords={destCoords}
        routeCoords={routeCoords}
      />
    </div>
  );
};

export default SafeRoutePage;
