import { useState } from "react";

// get user location

export function useGeoLocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);

  function getPosition() {
    // get location
    setIsLoadingPosition(true);
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setIsLoadingPosition(false);
      },
      function (error) {
        console.log(error.message);
        setIsLoadingPosition(false);
      }
    );
  }

  return { position, isLoadingPosition, setIsLoadingPosition, getPosition };
}
