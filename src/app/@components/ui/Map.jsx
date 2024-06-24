import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "@/Constant";
import { TextField } from "@mui/material";
import CircularLoader from "./CircularLoader";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map({marker,setMarker,setAddress,setPostcode}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const autocompleteRef = useRef(null);
  // const [marker, setMarker] = useState(null);
  // const [address, setAddress] = useState("");
  // const [postcode, setPostcode] = useState("");

  const onLoad = useCallback(function callback(map) {
    setMap(map);
    // Try to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(currentLocation);
        setMarker(currentLocation);
        // Get address for the current location
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: currentLocation }, (results, status) => {
          if (status === "OK" && results[0]) {
            setAddress(results[0].formatted_address);
            const postcodeComponent = results[0].address_components.find(
              (component) => component.types.includes("postal_code")
            );
            if (postcodeComponent) {
              setPostcode(postcodeComponent.long_name);
            }
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      });
    }
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      const latLng = {
        lat: location.lat(),
        lng: location.lng(),
      };
      setMarker(latLng);
      map.panTo(latLng);
      setAddress(place.formatted_address);

      const postcodeComponent = place.address_components.find((component) =>
        component.types.includes("postal_code")
      );
      if (postcodeComponent) {
        setPostcode(postcodeComponent.long_name);
      }
    }
  };

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const latLng = { lat, lng };
    setMarker(latLng);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
        const postcodeComponent = results[0].address_components.find(
          (component) => component.types.includes("postal_code")
        );
        if (postcodeComponent) {
          setPostcode(postcodeComponent.long_name);
        }
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  return isLoaded ? (
    <div className="grow">
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={onPlaceChanged}
      >
        <TextField fullWidth type="text" placeholder="Search for a location" className="mb-4"/>
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker || { lat: -3.745, lng: -38.523 }}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  ) : (
    <CircularLoader></CircularLoader>
  );
}

export default React.memo(Map);
