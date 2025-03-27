"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { database, ref, onValue } from "@/firebase/firebase";
import firebase from "firebase/compat/app";
import { io } from "socket.io-client";
import socket from "@/utils/socket";

// Define type for GPS location
interface Location {
  lat: number;
  lng: number;
}

// Fix default marker issue in Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  // iconUrl: '/poka.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const customIcon2 = new L.Icon({
  iconUrl: '/icons8-location.gif',
  iconSize: [25, 25],
  iconRetinaUrl: '/icons8-location.gif',

  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MarkerInterface {
  id: string;
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<Location | null>({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [markers, setMarkers] = useState<MarkerInterface[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        socket.emit("userLocation", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    socket.on("userLocation", (data: { id: string; latitude: string; longitude: string }) => {
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          id: data.id,
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        },
      ]);
    });

    socket.on("busLocation", (data: { latitude: number; longitude: number }) => {
      setLocation({ lat: data.latitude, lng: data.longitude });
    });
  }, []);

  useEffect(() => {
    const locationRef = ref(database, "buses/bus1");

    const unsubscribe = onValue(
      locationRef,
      (snapshot: { exists: () => any; val: () => any }) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.latitude && data.longitude) {
            setLocation({ lat: data.latitude, lng: data.longitude });
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (!location) {
    return <p>Loading GPS data...</p>;
  }

  return (
    <MapContainer
      center={
        userLocation?.lat
          ? [userLocation.lat, userLocation.lng]
          : location
            ? [location.lat, location.lng]
            : [0, 0]
      }
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[location.lat || 0, location.lng || 0]} icon={customIcon}>
        <Popup>Bus Location: {location.lat}, {location.lng}</Popup>
      </Marker>
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={customIcon2}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.latitude, marker.longitude]}
          icon={customIcon}
        >
          <Popup>Marker {marker.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
