import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import ChangeMapView from "./ChangeMapView";
import { useCities } from "../context/CitiesContext";

export default function Map() {
  const { mapPosition, setMapPosition } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [setMapPosition, lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeMapView coords={mapPosition} lat={lat} lng={lng} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate("form"),
  });
}
