// import React, { useState } from "react";
// import SafeRouteMap from "./SafeRouteMap";
// import axios from "axios";

// const TripPlanner = () => {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [sourceCoords, setSourceCoords] = useState(null);
//   const [destCoords, setDestCoords] = useState(null);
//   const [trigger, setTrigger] = useState(false);

//   const getCoordinates = async (address) => {
//     try {
//       const res = await axios.get("https://nominatim.openstreetmap.org/search", {
//         params: {
//           q: address,
//           format: "json",
//         },
//       });
//       const place = res.data[0];
//       return {
//         lat: parseFloat(place.lat),
//         lng: parseFloat(place.lon),
//       };
//     } catch (err) {
//       console.error("Failed to get coordinates for", address, err);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const src = await getCoordinates(source);
//     const dest = await getCoordinates(destination);
//     if (src && dest) {
//       setSourceCoords(src);
//       setDestCoords(dest);
//       setTrigger((prev) => !prev); // toggle trigger to re-fetch route
//     }
//   };

//   const openInGoogleMaps = () => {
//     if (sourceCoords && destCoords) {
//       const src = `${sourceCoords.lat},${sourceCoords.lng}`;
//       const dst = `${destCoords.lat},${destCoords.lng}`;
//       window.open(`https://www.google.com/maps/dir/${src}/${dst}`, "_blank");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Enter source"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Enter destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           required
//         />
//         <button type="submit">Get Safe Route</button>
//       </form>

//       <button onClick={openInGoogleMaps} disabled={!sourceCoords || !destCoords}>
//         Open in Google Maps
//       </button>

//       <SafeRouteMap
//         sourceCoords={sourceCoords}
//         destCoords={destCoords}
//         trigger={trigger}
//       />
//     </div>
//   );
// };

// export default TripPlanner;


// import React, { useState, useEffect, useRef } from "react";
// import useMapQuest from "./MapQuestLoader";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const TripPlanner = () => {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const routeLayer = useRef(null);
  
//   // Load MapQuest scripts
//   useMapQuest();

//   useEffect(() => {
//     // Wait for scripts to load
//     const initMap = () => {
//       if (!window.MQ || !window.L || mapInstance.current) return;

//       // Create map container if it doesn't exist
//       if (!document.getElementById('map')) {
//         const mapDiv = document.createElement('div');
//         mapDiv.id = 'map';
//         mapDiv.style.height = '500px';
//         mapDiv.style.width = '100%';
//         mapRef.current.appendChild(mapDiv);
//       }

//       // Initialize map
//       mapInstance.current = L.map('map', {
//         layers: MQ.mapLayer(),
//         center: [35.791188, -78.636755],
//         zoom: 12
//       });
//     };

//     // Try to initialize immediately
//     initMap();

//     // If scripts aren't loaded yet, set up a retry mechanism
//     if (!window.MQ || !window.L) {
//       const interval = setInterval(() => {
//         if (window.MQ && window.L) {
//           initMap();
//           clearInterval(interval);
//         }
//       }, 100);
//       return () => clearInterval(interval);
//     }
//   }, []);

//   const runDirection = (start, end) => {
//     if (!mapInstance.current || !window.MQ) return;

//     // Clear previous route if exists
//     if (routeLayer.current) {
//       mapInstance.current.removeLayer(routeLayer.current);
//     }

//     const dir = MQ.routing.directions();
//     dir.route({ locations: [start, end] });

//     const CustomRouteLayer = MQ.Routing.RouteLayer.extend({
//       createStartMarker: (location) => {
//         const custom_icon = L.icon({
//           iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
//           iconSize: [20, 29],
//           iconAnchor: [10, 29],
//           popupAnchor: [0, -29]
//         });
//         return L.marker(location.latLng, {icon: custom_icon}).addTo(mapInstance.current);
//       },
//       createEndMarker: (location) => {
//         const custom_icon = L.icon({
//           iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
//           iconSize: [20, 29],
//           iconAnchor: [10, 29],
//           popupAnchor: [0, -29]
//         });
//         return L.marker(location.latLng, {icon: custom_icon}).addTo(mapInstance.current);
//       }
//     });

//     routeLayer.current = new CustomRouteLayer({
//       directions: dir,
//       fitBounds: true
//     });
    
//     mapInstance.current.addLayer(routeLayer.current);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (source && destination) {
//       runDirection(source, destination);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <form onSubmit={handleSubmit} style={{ marginBottom: "1rem", display: 'flex', gap: '10px' }}>
//         <input
//           type="text"
//           placeholder="Enter starting point"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           required
//           style={{ padding: '8px', flex: 1 }}
//         />
//         <input
//           type="text"
//           placeholder="Enter destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           required
//           style={{ padding: '8px', flex: 1 }}
//         />
//         <button type="submit" style={{ padding: '8px 16px' }}>Get Route</button>
//       </form>

//       <div ref={mapRef} style={{ height: '500px', width: '100%', border: '1px solid #ccc' }}></div>
//     </div>
//   );
// };

// export default TripPlanner;




// import React, { useState } from "react";
// import SafeRouteMap from "./SafeRouteMap";
// import axios from "axios";

// interface Coordinate {
//   lat: number;
//   lng: number;
// }

// const TripPlanner: React.FC = () => {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [sourceCoords, setSourceCoords] = useState<Coordinate | null>(null);
//   const [destCoords, setDestCoords] = useState<Coordinate | null>(null);
//   const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  
//   const API_URL = "http://localhost:8000/api/safe-route";
//   const getCoordinates = async (address: string): Promise<Coordinate | null> => {
//     try {
//       const res = await axios.post("http://localhost:8000/api/safe-route", {
//         params: { q: address, format: "json" },
//       });
//       const place = res.data[0];
//       return {
//         lat: parseFloat(place.lat), 
//         lng: parseFloat(place.lon),
//       };
//     } catch (err) {
//       console.error("Failed to get coordinates for", address, err);
//       return null;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const src = await getCoordinates(source);
//     const dest = await getCoordinates(destination);
//     if (src && dest) {
//       setSourceCoords(src);
//       setDestCoords(dest);
//     }
//   };

//   const openInGoogleMaps = () => {
//     if (sourceCoords && destCoords) {
//       const src = `${sourceCoords.lat},${sourceCoords.lng}`;
//       const dst = `${destCoords.lat},${destCoords.lng}`;
//       window.open(`https://www.google.com/maps/dir/${src}/${dst}`, "_blank");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Enter source"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Enter destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           required
//         />
//         <button type="submit">Get Safe Route</button>
//       </form>

//       <button onClick={openInGoogleMaps} disabled={!sourceCoords || !destCoords}>
//         Open in Google Maps
//       </button>

//       <SafeRouteMap
//         sourceCoords={sourceCoords}
//         destCoords={destCoords}
//         routeCoords={routeCoords}
//         setRouteCoords={setRouteCoords}
//       />
//     </div>
//   );
// };

// export default TripPlanner;


// import React, { useState } from "react";
// import SafeRouteMap from "./SafeRouteMap";
// import axios from "axios";

// interface Coordinate {
//   lat: number;
//   lng: number;
// }

// const TripPlanner: React.FC = () => {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [sourceCoords, setSourceCoords] = useState<Coordinate | null>(null);
//   const [destCoords, setDestCoords] = useState<Coordinate | null>(null);
//   const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const API_URL = "http://localhost:8000/api/geocode";

//   // Geocoding function using Nominatim (OpenStreetMap)
//   const getCoordinates = async (address: string): Promise<Coordinate | null> => {
//     try {
//       // Use Nominatim for geocoding (free OpenStreetMap service)
//       const res = await axios.get(API_URL, {
//         params: { 
//           q: `${address}`, // Add Mumbai context for better results
//           format: "json",
//           limit: 1
//         }
//       });
      
//       if (!res.data || res.data.length === 0) {
//         console.error("No results found for", address);
//         return null;
//       }
      
//       const place = res.data[0];
//       return {
//         lat: parseFloat(place.lat),
//         lng: parseFloat(place.lng),
//       };
//     } catch (err) {
//       console.error("Failed to get coordinates for", address, err);
//       return null;
//     }
//   };

//   // Get safe route from your backend
//   const getSafeRoute = async (source: Coordinate, destination: Coordinate): Promise<Coordinate[]> => {
//     try {
//       const res = await axios.post(API_URL, {
//         source: source,
//         destination: destination
//       });
      
//       // Convert the route coordinates to the expected format
//       const routeCoordinates = res.data.route.map((coord: [number, number]) => ({
//         lat: coord[1], // longitude first, latitude second in the response
//         lng: coord[0]
//       }));
      
//       return routeCoordinates;
//     } catch (err) {
//       console.error("Failed to get safe route", err);
//       throw err;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Step 1: Get coordinates for both locations
//       const src = await getCoordinates(source);
//       const dest = await getCoordinates(destination);
      
//       if (!src || !dest) {
//         setError("Could not find coordinates for one or both locations");
//         return;
//       }

//       setSourceCoords(src);
//       setDestCoords(dest);

//       // Step 2: Get safe route
//       const route = await getSafeRoute(src, dest);
//       setRouteCoords(route);
      
//     } catch (err) {
//       setError("An error occurred while getting the safe route");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openInGoogleMaps = () => {
//     if (sourceCoords && destCoords) {
//       const src = `${sourceCoords.lat},${sourceCoords.lng}`;
//       const dst = `${destCoords.lat},${destCoords.lng}`;
//       window.open(`https://www.google.com/maps/dir/${src}/${dst}`, "_blank");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Enter source (e.g., Khar)"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Enter destination (e.g., Bandra)"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Getting Safe Route..." : "Get Safe Route"}
//         </button>
//       </form>
      
//       {error && (
//         <div style={{ color: "red", marginBottom: "1rem" }}>
//           {error}
//         </div>
//       )}
      
//       <button onClick={openInGoogleMaps} disabled={!sourceCoords || !destCoords}>
//         Open in Google Maps
//       </button>
      
//       <SafeRouteMap
//         sourceCoords={sourceCoords}
//         destCoords={destCoords}
//         routeCoords={routeCoords}
//         setRouteCoords={setRouteCoords}
//       />
//     </div>
//   );
// };

// export default TripPlanner;


import React, { useState } from "react";
import SafeRouteMap from "./SafeRouteMap";
import axios from "axios";

interface Coordinate {
  lat: number;
  lng: number;
}

const TripPlanner: React.FC = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceCoords, setSourceCoords] = useState<Coordinate | null>(null);
  const [destCoords, setDestCoords] = useState<Coordinate | null>(null);
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const GEOCODE_API = "http://localhost:8000/api/geocode";
  const ROUTE_API = "http://localhost:8000/api/safe-route";

  // Call backend /api/geocode for local lookup
  const getCoordinates = async (place: string): Promise<Coordinate | null> => {
    try {
      const res = await axios.get(GEOCODE_API, { params: { q: place } });
      return {
        lat: res.data.lat,
        lng: res.data.lng,
      };
    } catch (err) {
      console.error("Geocoding failed for:", place, err);
      return null;
    }
  };

  // Get route from FastAPI
  const getSafeRoute = async (
    source: Coordinate,
    destination: Coordinate
  ): Promise<Coordinate[]> => {
    try {
      const res = await axios.post(ROUTE_API, {
        source,
        destination,
      });

      return res.data.route.map(([lng, lat]: [number, number]) => ({
        lat,
        lng,
      }));
    } catch (err) {
      console.error("Safe route fetch failed", err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const src = await getCoordinates(source);
      const dst = await getCoordinates(destination);

      if (!src || !dst) {
        setError("Could not get coordinates for one or both places.");
        return;
      }

      setSourceCoords(src);
      setDestCoords(dst);

      const route = await getSafeRoute(src, dst);
      setRouteCoords(route);
    } catch (err) {
      setError("Failed to get safe route.");
    } finally {
      setLoading(false);
    }
  };

  const openInGoogleMaps = () => {
    if (sourceCoords && destCoords) {
      const src = `${sourceCoords.lat},${sourceCoords.lng}`;
      const dst = `${destCoords.lat},${destCoords.lng}`;
      window.open(`https://www.google.com/maps/dir/${src}/${dst}`, "_blank");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter source (e.g., Dadar)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter destination (e.g., Bandra)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Safe Route"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={openInGoogleMaps} disabled={!sourceCoords || !destCoords}>
        Open in Google Maps
      </button>

      <SafeRouteMap
        sourceCoords={sourceCoords}
        destCoords={destCoords}
        routeCoords={routeCoords}
        setRouteCoords={setRouteCoords}
      />
    </div>
  );
};

export default TripPlanner;
