"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { database, ref, onValue } from "@/firebase/firebase";
import socket from "@/utils/socket";

// Define type for GPS location
interface Location {
  lat: number;
  lng: number;
}

interface BusLocation {
  route: string;
    currentLocation: {
      latitude: number;
      longitude: number;
    },
    passengers: number,
    status: string;
}

// Fix default marker issue in Leaflet
const busIcon = new L.Icon({
  iconUrl: "/bus.png",
  iconSize: [50,80],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const userIcon = new L.Icon({
  // iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconUrl:'/pin.svg',
  iconSize: [25, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const animatedBusIcon = new L.DivIcon({
  className: "animated-marker transition-transform animate-bounce",  // Apply animation
  html: '<img src="/pin.svg" width="50" height="80"/>',
  iconSize: [50, 80],
  iconAnchor: [25, 80],
});

// Component to update the map center dynamically
const CenterMap: React.FC<{ location: Location }> = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([location.lat, location.lng], map.getZoom(), { animate: true });
  }, [location, map]);
  return null;
};

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [busLocations, setBusLocations] = useState<BusLocation[]>([]);

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("userLocation", { latitude, longitude });

        setUserLocation({ lat: latitude, lng: longitude });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    // Listen for bus locations from Firebase
    const busesRef = ref(database, "buses/");
    const unsubscribe = onValue(busesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const busArray: BusLocation[] = Object.keys(data).map((busId) => ({
          id: busId,
          ...data[busId],
        }));
        setBusLocations(busArray);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <MapContainer
      center={userLocation ? [userLocation.lat, userLocation.lng] : [0, 0]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Dynamically center the map on the user's location */}
      {userLocation && <CenterMap location={userLocation} />}

      {/* Render User Location */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Render Multiple Bus Locations */}
      {busLocations.map((bus) => (
        <Marker key={bus.route} position={[bus.currentLocation.latitude, bus.currentLocation.longitude]} icon={busIcon}>
          <Popup>{bus.route}</Popup>
        </Marker>
      ))}

      <Marker position={[23.172345,90.3032401]} icon={busIcon} >
          <Popup><div>
            <h3>Bus name: {'3 Star 20'}</h3>
            <p>Route: {'Mirpur<Pallobi>DSC'}</p>
              <p>Driver Number: 01871755616</p>

              <h1>3 Star || mirpur-sony-dsc</h1>
              <p>Passengers: {10}</p>
              <p>Status: {"Running"}</p>
            </div></Popup>
      </Marker>
      <Marker position={[23.172349,90.3032407]} icon={busIcon} >
          <Popup><div>
            <h3>Bus name: {'3 Star 20'}</h3>
            <p>Route: {'Mirpur<Pallobi>DSC'}</p>
              <p>Driver Number: 01871755616</p>

              <h1>3 Star || mirpur-sony-dsc</h1>
              <p>Passengers: {10}</p>
              <p>Status: {"Running"}</p>
            </div></Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
