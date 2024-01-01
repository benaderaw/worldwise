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
import useGeoLocation from "../hooks/useGeoLocation";
import Spinner from "./Spinner";

export default function Map() {
  const { isLoadingx } = useGeoLocation();
  const { mapPosition, setMapPosition } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(isLoadingx);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [setMapPosition, lat, lng]);

  return (
    <>
      {isLoadingx === true && <Spinner />}
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
    </>
  );
}

function DetectClick() {
  const { mapPosition, setMapPosition } = useCities();

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
