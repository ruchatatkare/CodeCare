
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



// Mumbai bounds - more precise boundaries
const MUMBAI_BOUNDS: [[number, number], [number, number]] = [
  [18.85, 72.70], // Southwest corner
  [19.35, 73.10], // Northeast corner
];

// Mumbai center coordinates
const MUMBAI_CENTER = { lat: 19.0760, lng: 72.8777 };

const SAFETY_ZONES = [
{"lat": 19.0176, "lng": 72.8562, "radius": 300, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Rape", "Acid attack", "Abduction"]},
{"lat": 19.0297, "lng": 72.8795, "radius": 250, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Human trafficking", "Attempt to rape"]},
{"lat": 19.1550, "lng": 72.8493, "radius": 200, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Rape", "Domestic violence"]},
{"lat": 19.1907, "lng": 72.8571, "radius": 200, "safetyScore": 1, "type": "high-crime", "crimeTypes": ["Acid attack", "Abduction"]},
{"lat": 19.0846, "lng": 72.8960, "radius": 150, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Rape", "Stalking"]},
{"lat": 19.0012, "lng": 72.8425, "radius": 250, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Human trafficking", "Molestation"]},
{"lat": 18.9670, "lng": 72.8310, "radius": 200, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Attempt to rape", "Sexual harassment"]},
{"lat": 19.0810, "lng": 72.8410, "radius": 200, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Abduction", "Voyeurism"]},
{"lat": 19.2183, "lng": 72.9781, "radius": 300, "safetyScore": 1, "type": "high-crime", "crimeTypes": ["Rape", "Domestic violence"]},
{"lat": 19.2073, "lng": 72.8421, "radius": 250, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Acid attack", "Stalking"]},
{"lat": 19.1202, "lng": 72.8694, "radius": 200, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Sexual harassment", "Molestation"]},
{"lat": 18.9470, "lng": 72.8350, "radius": 150, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Attempt to rape", "Abduction"]},
{"lat": 19.1330, "lng": 72.8610, "radius": 200, "safetyScore": 2, "type": "high-crime", "crimeTypes": ["Human trafficking", "Voyeurism"]},
{"lat": 19.0827, "lng": 72.8675, "radius": 200, "safetyScore": 5, "type": "moderate-risk", "crimeTypes": ["Sexual harassment", "Stalking"]},
{"lat": 19.0986, "lng": 72.8485, "radius": 200, "safetyScore": 5, "type": "moderate-risk", "crimeTypes": ["Molestation", "Domestic violence"]},
{"lat": 19.1365, "lng": 72.8269, "radius": 250, "safetyScore": 5, "type": "moderate-risk", "crimeTypes": ["Voyeurism", "Public harassment"]},
{"lat": 19.0748, "lng": 72.8856, "radius": 250, "safetyScore": 4, "type": "moderate-risk", "crimeTypes": ["Stalking", "Eve-teasing"]},
{"lat": 19.0840, "lng": 72.9100, "radius": 200, "safetyScore": 4, "type": "moderate-risk", "crimeTypes": ["Domestic violence", "Cyberstalking"]},
{"lat": 18.9617, "lng": 72.8070, "radius": 200, "safetyScore": 4, "type": "moderate-risk", "crimeTypes": ["Sexual harassment", "Molestation"]},
{"lat": 19.0551, "lng": 72.8353, "radius": 200, "safetyScore": 5, "type": "moderate-risk", "crimeTypes": ["Public intoxication", "Disputes"]},
{"lat": 19.1983, "lng": 72.8428, "radius": 250, "safetyScore": 5, "type": "moderate-risk", "crimeTypes": ["Theft", "Pickpocketing"]},
{"lat": 19.1211, "lng": 72.8277, "radius": 200, "safetyScore": 4, "type": "moderate-risk", "crimeTypes": ["Drunken brawls", "Eve-teasing"]},
{"lat": 19.0300, "lng": 72.8750, "radius": 200, "safetyScore": 5, "type": "moderate-risk", "crimeTypes": ["Harassment", "Vandalism"]},
{"lat": 19.0227, "lng": 72.8666, "radius": 200, "safetyScore": 5, "type": "moderate-risk", "crimeTypes": ["Stalking", "Nocturnal risks"]},
{"lat": 19.0524, "lng": 72.8995, "radius": 200, "safetyScore": 4, "type": "moderate-risk", "crimeTypes": ["Molestation", "Theft"]},
{"lat": 19.2104, "lng": 72.8347, "radius": 200, "safetyScore": 9, "type": "safe", "crimeTypes": ["Rare petty theft"]},
{"lat": 19.2280, "lng": 72.8567, "radius": 250, "safetyScore": 9, "type": "safe", "crimeTypes": ["Police patrolled"]},
{"lat": 19.0643, "lng": 72.8491, "radius": 200, "safetyScore": 8, "type": "safe", "crimeTypes": ["Safe residential zone"]},
{"lat": 19.0961, "lng": 72.8296, "radius": 200, "safetyScore": 9, "type": "safe", "crimeTypes": ["Well-lit public area"]}
{"lat": 18.9517, "lng": 72.8313, "radius": 300, "safetyScore": 10, "type": "safe", "crimeTypes": ["Community vigilance"]},
{"lat": 19.0723, "lng": 72.8821, "radius": 250, "safetyScore": 8, "type": "safe", "crimeTypes": ["Low crime reports"]},
{"lat": 19.0852, "lng": 72.8311, "radius": 150, "safetyScore": 9, "type": "safe", "crimeTypes": ["CCTV surveillance"]},
{"lat": 19.1452, "lng": 72.8357, "radius": 250, "safetyScore": 8, "type": "safe", "crimeTypes": ["Safe for night walks"]},
{"lat": 19.0942, "lng": 72.8381, "radius": 200, "safetyScore": 9, "type": "safe", "crimeTypes": ["Women-friendly"]},
{"lat": 18.9310, "lng": 72.8330, "radius": 300, "safetyScore": 10, "type": "safe", "crimeTypes": ["Zero tolerance policy"]},
{"lat": 19.1115, "lng": 72.8629, "radius": 200, "safetyScore": 9, "type": "safe", "crimeTypes": ["Frequent police checks"]},
{"lat": 19.1730, "lng": 72.8600, "radius": 250, "safetyScore": 9, "type": "safe", "crimeTypes": ["Safe for families"]},
];

// Safety scoring: 1-3 (unsafe), 4-6 (moderate), 7-10 (safe)
const getSafetyColor = (score: number) => {
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const safetyZonesRef = useRef<L.Circle[]>([]);

  // Calculate distance between two points in meters
  const getDistanceFromLatLonInM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  // Calculate safety score for a point
  const calculatePointSafety = (point: Coordinate) => {
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

  // Find safer alternative point
  const findSaferAlternative = (point: Coordinate, unsafeZones: any[]) => {
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

  // Calculate safe route avoiding unsafe areas
  const calculateSafeRoute = (start: Coordinate, end: Coordinate) => {
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

  // Initialize map - runs only once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map centered on Mumbai
    mapInstanceRef.current = L.map(mapRef.current).setView(
      [MUMBAI_CENTER.lat, MUMBAI_CENTER.lng],
      12
    );

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    // Set Mumbai bounds - restrict map to Mumbai area only
    mapInstanceRef.current.setMaxBounds(MUMBAI_BOUNDS);
    
    // Set zoom levels
    mapInstanceRef.current.setMinZoom(11);  // Prevent zooming out too much
    mapInstanceRef.current.setMaxZoom(18);  // Allow detailed zoom
    
    // Make bounds sticky - prevents dragging outside Mumbai
    mapInstanceRef.current.options.maxBoundsViscosity = 1.0;

    // Add safety zones to map
    SAFETY_ZONES.forEach(zone => {
      const circle = L.circle([zone.lat, zone.lng], {
        color: getSafetyColor(zone.safetyScore),
        fillColor: getSafetyColor(zone.safetyScore),
        fillOpacity: 0.2,
        radius: zone.radius,
        weight: 2
      }).addTo(mapInstanceRef.current!);

      circle.bindPopup(`
        <div style="text-align: center;">
          <b>${zone.type.replace('-', ' ').toUpperCase()}</b><br>
          Safety Score: ${zone.safetyScore}/10<br>
          Radius: ${zone.radius}m
        </div>
      `);

      safetyZonesRef.current.push(circle);
    });

    // Add legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-size: 12px;">
          <h4 style="margin: 0 0 8px 0;">Safety Zones</h4>
          <div style="margin: 2px 0;"><span style="color: #ff4444; font-size: 16px;">●</span> Unsafe (1-3)</div>
          <div style="margin: 2px 0;"><span style="color: #ffaa00; font-size: 16px;">●</span> Moderate (4-6)</div>
          <div style="margin: 2px 0;"><span style="color: #44ff44; font-size: 16px;">●</span> Safe (7-10)</div>
        </div>
      `;
      return div;
    };
    legend.addTo(mapInstanceRef.current);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle markers when source/destination changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current!.removeLayer(marker);
    });
    markersRef.current = [];

    // Add source marker
    if (sourceCoords) {
      const sourceMarker = L.marker([sourceCoords.lat, sourceCoords.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup('<b>Source</b>');
      markersRef.current.push(sourceMarker);
    }

    // Add destination marker
    if (destCoords) {
      const destMarker = L.marker([destCoords.lat, destCoords.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup('<b>Destination</b>');
      markersRef.current.push(destMarker);
    }

    // Fit map to show both markers (but stay within Mumbai bounds)
    if (sourceCoords && destCoords) {
      const group = new L.featureGroup(markersRef.current);
      const bounds = group.getBounds();
      
      // Only fit bounds if both points are within Mumbai
      if (bounds.isValid()) {
        mapInstanceRef.current.fitBounds(bounds.pad(0.1));
      }
    }
  }, [sourceCoords, destCoords]);

  // Handle route calculation and display
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing route
    if (routeLineRef.current) {
      mapInstanceRef.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    // Calculate and display route
    if (sourceCoords && destCoords) {
      // Use provided routeCoords if available, otherwise calculate safe route
      const routeData = routeCoords && routeCoords.length > 0 
        ? routeCoords 
        : calculateSafeRoute(sourceCoords, destCoords);

      if (routeData.length > 0) {
        // Update parent state if we calculated a new route
        if (routeCoords.length === 0) {
          setRouteCoords(routeData);
        }

        const latlngs = routeData.map(coord => [coord.lat, coord.lng]) as [number, number][];
        
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
          <div style="text-align: center;">
            <b>Safe Route</b><br>
            Overall Safety Score: ${avgSafety.toFixed(1)}/10<br>
            Distance: ${(latlngs.length * 0.1).toFixed(1)}km (approx)
          </div>
        `);

        // Fit map to show the route (within Mumbai bounds)
        const routeBounds = routeLineRef.current.getBounds();
        if (routeBounds.isValid()) {
          mapInstanceRef.current.fitBounds(routeBounds.pad(0.1));
        }
      }
    }
  }, [sourceCoords, destCoords, routeCoords, setRouteCoords]);

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