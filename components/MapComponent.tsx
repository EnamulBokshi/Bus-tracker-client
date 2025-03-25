"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { database, ref, onValue } from "@/firebase/firebase";
import firebase from "firebase/compat/app";

// Define type for GPS location
interface Location {
  lat: number;
  lng: number;
}

// Fix default marker issue in Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const locationRef = ref(database, "buses/bus1");

    const unsubscribe = onValue(locationRef, (snapshot: { exists: () => any; val: () => any; }) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.latitude && data.longitude) {
          setLocation({ lat: data.latitude, lng: data.longitude });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!location) {
    return <p>Loading GPS data...</p>;
  }

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[location.lat, location.lng]} icon={customIcon}>
        <Popup>Bus Location: {location.lat}, {location.lng}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
