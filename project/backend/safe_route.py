from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import openrouteservice
from shapely.geometry import Point, Polygon, mapping
import logging
import requests
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from geopy.geocoders import Nominatim
from fastapi.responses import JSONResponse
from .mumbai_locations import mumbai_localities
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Replace with your actual OpenRouteService API key
ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImFhMzdhNDVlNDZhNDQ1MzViZGM4MzYyY2EyNmMzODNkIiwiaCI6Im11cm11cjY0In0="
client = openrouteservice.Client(key=ORS_API_KEY)

# Dummy safety zones (higher score = safer)
# Each area is defined as a polygon and a score
SAFETY_ZONES = [
    {"polygon": Polygon([(72.83, 19.05), (72.84, 19.05), (72.84, 19.06), (72.83, 19.06)]), "score": 8},  # Bandra
    {"polygon": Polygon([(72.87, 19.08), (72.88, 19.08), (72.88, 19.09), (72.87, 19.09)]), "score": 6},  # Kurla
    {"polygon": Polygon([(72.85, 19.07), (72.86, 19.07), (72.86, 19.08), (72.85, 19.08)]), "score": 2},  # Unsafe zone
]

class Coordinate(BaseModel):
    lat: float
    lng: float

class RouteRequest(BaseModel):
    source: Coordinate
    destination: Coordinate

@router.post("/api/safe-route")
def get_safe_route(data: RouteRequest):
    try:
        logger.info(f"Received route request from {data.source} to {data.destination}")

        coords = [[data.source.lng, data.source.lat], [data.destination.lng, data.destination.lat]]
        logger.info(f"Coordinates for routing: {coords}")

        avoid_polygons = get_avoid_polygons()
        logger.info(f"Avoid polygons generated: {avoid_polygons}")

        route = client.directions(
            coordinates=coords,
            profile='driving-car',
            format='geojson',
            options={"avoid_polygons": avoid_polygons} if avoid_polygons else None,
        )

        logger.info("Route successfully fetched from ORS")
        return {"route": route['features'][0]['geometry']['coordinates']}

    except Exception as e:
        logger.error(f"Error while fetching route: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def get_avoid_polygons():
    avoid_polys = []
    for zone in SAFETY_ZONES:
        if zone['score'] < 5:
            avoid_polys.append(zone['polygon'])

    if not avoid_polys:
        logger.info("No unsafe zones to avoid.")
        return {}

    # Combine all unsafe zones into one geometry
    multi = avoid_polys[0]
    for poly in avoid_polys[1:]:
        multi = multi.union(poly)

    logger.info(f"Avoiding combined unsafe polygons: {multi.wkt}")

    # Convert Shapely polygon to GeoJSON format
    return {
        "type": "Polygon",
        "coordinates": mapping(multi)["coordinates"]
    }

@router.get("/api/geocode")
def geocode_place(q: str):
    """
    Return geolocation from static Mumbai city/locality data.
    """
    place = q.strip().lower()
    coords = mumbai_localities.get(place)

    if coords:
        return JSONResponse(content={
            "lat": coords["lat"],
            "lng": coords["lng"],
            "address": place.title()
        })
    else:
        raise HTTPException(status_code=404, detail=f"No location found for '{q}'")


# @router.get("/api/geocode")
# def geocode_place(q: str):
#     """
#     Geocode a place using GeoPandas + geopxy
#     """
#     try:
#         logger.info(f"Geocoding using GeoPandas: {q}")
#         # df = pd.DataFrame(q)

#         # Use geopandas to geocode
#         gdf = gpd.tools.geocode(q)
#         print(gdf)
        
#         if gdf.empty:
#             raise HTTPException(status_code=404, detail=f"No results found for '{q}'")

#         # Extract latitude and longitude
#         point: Point = gdf.geometry.iloc[0]
#         location = {
#             "lat": point.y,
#             "lng": point.x,
#             "address": gdf["address"].iloc[0] if "address" in gdf else q
#         }

#         return JSONResponse(content=location)

#     except Exception as e:
#         logger.error(f"GeoPandas geocoding error: {e}")
#         raise HTTPException(status_code=500, detail=f"Geocoding failed: {str(e)}")