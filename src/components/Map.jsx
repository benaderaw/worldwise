import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect } from "react";
import ChangeMapView from "./ChangeMapView";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import Button from "./Button";
import { useGeoLocation } from "../hooks/useGeoLocation";

export default function Map() {
  const {
    isLoadingPosition,
    getPosition,
    position: geolocationPosition,
  } = useGeoLocation();

  const { mapPosition, setMapPosition } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [setMapPosition, lat, lng]);

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
