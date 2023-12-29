/* eslint-disable react/prop-types */
import { useMap } from "react-leaflet";

export default function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom(1));

  return null;
}
