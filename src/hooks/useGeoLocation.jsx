import { useState } from "react";

export default function useGeoLocation() {
  const [position, setPosition] = useState({});
  const [isLoadingx, setIsLoadingx] = useState(false);

  function getPosition() {
    // get location
    setIsLoadingx(true);
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setIsLoadingx(false);
      },
      function (error) {
        console.log(error.message);
        setIsLoadingx(false);
      }
    );
  }

  return { position, isLoadingx, setIsLoadingx, getPosition };
}
