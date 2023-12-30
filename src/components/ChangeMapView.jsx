/* eslint-disable react/prop-types */
import { useMap, Marker, Popup } from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";

export default function ChangeMapView({ coords, lat, lng }) {
  const { cities, mapPosition } = useCities();
  const map = useMap();
  map.setView(coords, map.getZoom(1));

  console.log(mapPosition);

  useEffect(() => {
    if (lat && lng) map.closePopup();
  }, [map, lat, lng]);

  return (
    <>
      {cities.map((city) => (
        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            <span>{city.emoji}</span>
            <span>
              {city.cityName}, {city.country}
            </span>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
