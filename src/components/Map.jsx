import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useParams } from "../hooks/useParams";
import Button from "./Button";
import ChangeMapView from "./ChangeMapView";

export default function Map() {
  const { lat, lng } = useParams();
  const {
    isLoadingPosition,
    getPosition,
    position: geolocationPosition,
  } = useGeoLocation();

  const { mapPosition, setMapPosition } = useCities();

  // set location
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [setMapPosition, lat, lng]);

  // get and set user location
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition, setMapPosition]);

  return (
    <>
      <div className={styles.mapContainer}>
        {!geolocationPosition && (
          <Button type="position" onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}
          </Button>
        )}
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
    </>
  );
}

function DetectClick() {
  const { mapPosition } = useCities();

  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return (
    <Marker position={mapPosition}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
