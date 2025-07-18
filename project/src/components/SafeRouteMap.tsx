
  // import React, { useEffect, useRef } from "react";
  // import L from "leaflet";
  // import "leaflet/dist/leaflet.css";

  // // Fix for default markers
  // delete L.Icon.Default.prototype._getIconUrl;
  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  // });

  // const SafeRouteMap = ({ sourceCoords, destCoords, routeCoords }) => {
  //   const mapRef = useRef(null);
  //   const mapInstanceRef = useRef(null);
  //   const markersRef = useRef([]);
  //   const routeLineRef = useRef(null);

  //   useEffect(() => {
  //     // Initialize map only once
  //     if (!mapInstanceRef.current && mapRef.current) {
  //       const defaultCenter = sourceCoords || { lat: 19.076, lng: 72.8777 };
        
  //       mapInstanceRef.current = L.map(mapRef.current).setView(
  //         [defaultCenter.lat, defaultCenter.lng],
  //         13
  //       );

  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //       }).addTo(mapInstanceRef.current);
  //     }

  //     return () => {
  //       // Cleanup on unmount
  //       if (mapInstanceRef.current) {
  //         mapInstanceRef.current.remove();
  //         mapInstanceRef.current = null;
  //       }
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (!mapInstanceRef.current) return;

  //     // Clear existing markers
  //     markersRef.current.forEach(marker => {
  //       mapInstanceRef.current.removeLayer(marker);
  //     });
  //     markersRef.current = [];

  //     // Add source marker
  //     if (sourceCoords) {
  //       const sourceMarker = L.marker([sourceCoords.lat, sourceCoords.lng])
  //         .addTo(mapInstanceRef.current)
  //         .bindPopup('Source');
  //       markersRef.current.push(sourceMarker);
  //     }

  //     // Add destination marker
  //     if (destCoords) {
  //       const destMarker = L.marker([destCoords.lat, destCoords.lng])
  //         .addTo(mapInstanceRef.current)
  //         .bindPopup('Destination');
  //       markersRef.current.push(destMarker);
  //     }

  //     // Fit map to show both markers
  //     if (sourceCoords && destCoords) {
  //       const group = new L.featureGroup(markersRef.current);
  //       mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
  //     }
  //   }, [sourceCoords, destCoords]);

  //   useEffect(() => {
  //     if (!mapInstanceRef.current) return;

  //     // Clear existing route
  //     if (routeLineRef.current) {
  //       mapInstanceRef.current.removeLayer(routeLineRef.current);
  //       routeLineRef.current = null;
  //     }

  //     // Add route polyline
  //     if (routeCoords && routeCoords.length > 0) {
  //       const latlngs = routeCoords.map(coord => [coord.lat, coord.lng]);
  //       routeLineRef.current = L.polyline(latlngs, {
  //         color: 'blue',
  //         weight: 6,
  //         opacity: 0.8
  //       }).addTo(mapInstanceRef.current);

  //       // Fit map to show the route
  //       mapInstanceRef.current.fitBounds(routeLineRef.current.getBounds().pad(0.1));
  //     }
  //   }, [routeCoords]);

  //   return (
  //     <div
  //       ref={mapRef}
  //       style={{ 
  //         height: "500px", 
  //         width: "100%", 
  //         marginTop: "1rem",
  //         border: "1px solid #ccc",
  //         borderRadius: "4px"
  //       }}
  //     />
  //   );
  // };

  // export default SafeRouteMap;


  import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface SafeRouteMapProps {
  sourceCoords: Coordinate | null;
  destCoords: Coordinate | null;
  routeCoords: Coordinate[];
  setRouteCoords: React.Dispatch<React.SetStateAction<Coordinate[]>>;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
// Dummy safety data - replace with database later
const SAFETY_ZONES = [
  // High crime areas (unsafe - avoid these)
  { lat: 19.065, lng: 72.845, radius: 500, safetyScore: 2, type: 'high-crime' },
  { lat: 19.075, lng: 72.860, radius: 300, safetyScore: 1, type: 'high-crime' },
  { lat: 19.080, lng: 72.870, radius: 400, safetyScore: 2, type: 'high-crime' },
  
  // Moderate risk areas
  { lat: 19.070, lng: 72.850, radius: 200, safetyScore: 5, type: 'moderate-risk' },
  { lat: 19.085, lng: 72.875, radius: 300, safetyScore: 4, type: 'moderate-risk' },
  
  // Safe areas (police stations, hospitals, well-lit areas)
  { lat: 19.060, lng: 72.840, radius: 200, safetyScore: 9, type: 'safe' },
  { lat: 19.090, lng: 72.880, radius: 250, safetyScore: 8, type: 'safe' },
  { lat: 19.078, lng: 72.855, radius: 150, safetyScore: 9, type: 'safe' },
];

// Safety scoring: 1-3 (unsafe), 4-6 (moderate), 7-10 (safe)
const getSafetyColor = (score) => {
  if (score <= 3) return '#ff4444'; // Red - unsafe
  if (score <= 6) return '#ffaa00'; // Orange - moderate
  return '#44ff44'; // Green - safe
};

const SafeRouteMap: React.FC<SafeRouteMapProps> = ({
  sourceCoords,
  destCoords,
  routeCoords,
  setRouteCoords,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const routeLineRef = useRef(null);
  const safetyZonesRef = useRef([]);

  // Calculate safe route avoiding unsafe areas
  const calculateSafeRoute = (start, end) => {
    if (!start || !end) return [];

    // Simple safe routing algorithm
    const route = [];
    const steps = 20; // Number of intermediate points
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      let lat = start.lat + (end.lat - start.lat) * t;
      let lng = start.lng + (end.lng - start.lng) * t;
      
      // Check if this point is in an unsafe area
      const currentPoint = { lat, lng };
      const nearbyUnsafeZones = SAFETY_ZONES.filter(zone => {
        const distance = getDistanceFromLatLonInM(currentPoint.lat, currentPoint.lng, zone.lat, zone.lng);
        return distance <= zone.radius && zone.safetyScore <= 3;
      });
      
      // If in unsafe area, try to find a safer detour
      if (nearbyUnsafeZones.length > 0) {
        const detour = findSaferAlternative(currentPoint, nearbyUnsafeZones);
        lat = detour.lat;
        lng = detour.lng;
      }
      
      route.push({ lat, lng });
    }
    
    return route;
  };

   useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (sourceCoords && destCoords) {
      const routeData =
        routeCoords.length > 0
          ? routeCoords
          : calculateSafeRoute(sourceCoords, destCoords);

      if (routeData.length > 0) {
        setRouteCoords(routeData); // store in parent
        // You can pan or fit bounds here if needed
        const latLngs = routeData.map((point) => [point.lat, point.lng]) as [number, number][];
        mapInstanceRef.current.fitBounds(latLngs);
      }
    }
  }, [sourceCoords, destCoords]);


  

  // Find safer alternative point
  const findSaferAlternative = (point, unsafeZones) => {
    const alternatives = [
      { lat: point.lat + 0.002, lng: point.lng }, // North
      { lat: point.lat - 0.002, lng: point.lng }, // South
      { lat: point.lat, lng: point.lng + 0.002 }, // East
      { lat: point.lat, lng: point.lng - 0.002 }, // West
    ];
    
    // Find the safest alternative
    let bestAlternative = point;
    let bestScore = 0;
    
    alternatives.forEach(alt => {
      const safetyScore = calculatePointSafety(alt);
      if (safetyScore > bestScore) {
        bestScore = safetyScore;
        bestAlternative = alt;
      }
    });
    
    return bestAlternative;
  };

  // Calculate safety score for a point
  const calculatePointSafety = (point) => {
    let totalScore = 7; // Default moderate safety
    let influenceCount = 0;
    
    SAFETY_ZONES.forEach(zone => {
      const distance = getDistanceFromLatLonInM(point.lat, point.lng, zone.lat, zone.lng);
      if (distance <= zone.radius) {
        totalScore += zone.safetyScore;
        influenceCount++;
      }
    });
    
    return influenceCount > 0 ? totalScore / (influenceCount + 1) : totalScore;
  };

  // Calculate distance between two points in meters
  const getDistanceFromLatLonInM = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of earth in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  useEffect(() => {
    // Initialize map only once
    if (!mapInstanceRef.current && mapRef.current) {
      const defaultCenter = sourceCoords || { lat: 19.076, lng: 72.8777 };
      
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [defaultCenter.lat, defaultCenter.lng],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      // Add safety zones to map
      SAFETY_ZONES.forEach(zone => {
        const circle = L.circle([zone.lat, zone.lng], {
          color: getSafetyColor(zone.safetyScore),
          fillColor: getSafetyColor(zone.safetyScore),
          fillOpacity: 0.2,
          radius: zone.radius
        }).addTo(mapInstanceRef.current);

        circle.bindPopup(`
          <b>${zone.type.replace('-', ' ').toUpperCase()}</b><br>
          Safety Score: ${zone.safetyScore}/10<br>
          Radius: ${zone.radius}m
        `);

        safetyZonesRef.current.push(circle);
      });

      // Add legend
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
          <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            <h4>Safety Zones</h4>
            <div><span style="color: #ff4444;">●</span> Unsafe (1-3)</div>
            <div><span style="color: #ffaa00;">●</span> Moderate (4-6)</div>
            <div><span style="color: #44ff44;">●</span> Safe (7-10)</div>
          </div>
        `;
        return div;
      };
      legend.addTo(mapInstanceRef.current);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add source marker
    if (sourceCoords) {
      const sourceMarker = L.marker([sourceCoords.lat, sourceCoords.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup('Source');
      markersRef.current.push(sourceMarker);
    }

    // Add destination marker
    if (destCoords) {
      const destMarker = L.marker([destCoords.lat, destCoords.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup('Destination');
      markersRef.current.push(destMarker);
    }

    // Fit map to show both markers
    if (sourceCoords && destCoords) {
      const group = new L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [sourceCoords, destCoords]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing route
    if (routeLineRef.current) {
      mapInstanceRef.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    // Calculate and add safe route
    if (sourceCoords && destCoords) {
      // Use provided routeCoords if available, otherwise calculate safe route
      const routeData = routeCoords && routeCoords.length > 0 
        ? routeCoords 
        : calculateSafeRoute(sourceCoords, destCoords);

      if (routeData.length > 0) {
        const latlngs = routeData.map(coord => [coord.lat, coord.lng]);
        
        // Calculate overall route safety
        const avgSafety = routeData.reduce((sum, coord) => 
          sum + calculatePointSafety(coord), 0) / routeData.length;
        
        // Color route based on safety
        const routeColor = getSafetyColor(avgSafety);
        
        routeLineRef.current = L.polyline(latlngs, {
          color: routeColor,
          weight: 6,
          opacity: 0.8
        }).addTo(mapInstanceRef.current);

        routeLineRef.current.bindPopup(`
          <b>Safe Route</b><br>
          Overall Safety Score: ${avgSafety.toFixed(1)}/10<br>
          Distance: ${(latlngs.length * 0.1).toFixed(1)}km (approx)
        `);

        // Fit map to show the route
        mapInstanceRef.current.fitBounds(routeLineRef.current.getBounds().pad(0.1));
      }
    }
  }, [sourceCoords, destCoords, routeCoords]);

  return (
    <div
      ref={mapRef}
      style={{ 
        height: "500px", 
        width: "100%", 
        marginTop: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }}
    />
  );
};

export default SafeRouteMap;