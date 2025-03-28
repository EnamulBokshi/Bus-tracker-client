"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { addClassName } from "leaflet-geosearch/dist/domUtils.js";

// Define type for GPS location
interface Location {
  lat: number;
  lng: number;
}

// Custom component to integrate GeoSearchControl
const SearchControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      autoClose: true,
      retainZoomLevel: true,
      animateZoom: true,
      className: "",
    });

    map.addControl(searchControl);
    // Apply Tailwind styles dynamically
    setTimeout(() => {
      const searchBox = document.querySelector(".leaflet-control-geosearch form") as HTMLElement;
      console.log(searchBox)
      if (searchBox) {
        // console.log(searchBox)
        searchBox.style.backgroundColor = "#000000"
        searchBox.classList.add(
          "bg-black", "text-white", "border", "border-white", "rounded-md", 
          "px-3", "py-2", "shadow-lg"
        );
      }

      const searchInput = document.querySelector(".leaflet-control-geosearch input") as HTMLElement;
      if (searchInput) {
        searchInput.classList.add("bg-black", "text-white", "placeholder-gray-400", "outline-none");
      }

      const searchResults = document.querySelector(".leaflet-control-geosearch .results") as HTMLElement;
      if (searchResults) {
        searchResults.classList.add("bg-black", "text-white", "border", "border-gray-500", "rounded-md");
      }

      const resultItems = document.querySelectorAll(".leaflet-control-geosearch .results li");
      resultItems.forEach((item) => {
        (item as HTMLElement).classList.add("hover:bg-gray-800", "px-3", "py-2", "cursor-pointer");
      });
    }, 500); // Timeout to ensure the elements exist before applying styles

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        if(err.code === 1) {
          alert("Please allow location access to use this feature.");
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  return (
    <MapContainer
      center={userLocation ? [userLocation.lat, userLocation.lng] : [23.8103, 90.4125]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={new L.Icon({ iconUrl: "/pin.svg", iconSize: [25, 40] })}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      <SearchControl />
    </MapContainer>
  );
};

export default MapComponent;
