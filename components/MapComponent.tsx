"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import socket from "@/utils/socket";
import SearchControl from "./MapControl";
import { Bus } from "@/types/types";

// Types
interface Location {
  lat: number;
  lng: number;
}

interface BusLocation {
  busId?: string;
  route: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  passengers: number;
  status: string;
}

// Custom icons
const busIcon = new L.Icon({
  iconUrl: "/bus.png",
  iconSize: [40, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const userIcon = new L.Icon({
  iconUrl: "/pin.svg",
  iconSize: [25, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component to dynamically center map
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
      (err) => {
        console.log("Geolocation error:", err);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    // Handle single bus update
    const handleBusLocation = (data:any) => {
      setBusLocations((prev) => {
        const updated = [...prev];
        const index = updated.findIndex(
          (bus) =>
            (bus.busId && data.busId && bus.busId === data.busId) ||
            (bus.route && data.route && bus.route === data.route)
        );

        if (index !== -1) {
          updated[index] = {
            ...updated[index],
            ...data,
            currentLocation: data.currentLocation,
          };
        } else {
          updated.push({
            busId: data.busId,
            route: data.route,
            currentLocation: data.currentLocation,
            passengers: data.passengers || 0,
            status: data.status || "unknown",
          });
        }

        return updated;
      });
    };

    // Handle full bus list
    const handleAllBusLocations = (busesData:any) => {
      const newBuses = Object.keys(busesData).map((busId) => {
        console.log("Bus data:", busesData[busId]);
        return {
          busId,
          busName: busesData[busId].busName || `Bus ${busId}`,
          driver: busesData[busId].driver || `Driver ${busId}`,
          route: busesData[busId].route || `Route ${busId}`,
          currentLocation: busesData[busId].currentLocation,
          passengers: busesData[busId].passengers || 0,
          status: busesData[busId].status || "unknown",        
        }
      });

      setBusLocations((prev) => {
        const merged = [...prev];

        newBuses.forEach((incoming) => {
          const index = merged.findIndex(
            (bus) =>
              (bus.busId && incoming.busId && bus.busId === incoming.busId) ||
              (bus.route && incoming.route && bus.route === incoming.route)
          );

          if (index !== -1) {
            merged[index] = { ...merged[index], ...incoming };
          } else {
            merged.push(incoming);
          }
        });

        return merged;
      });
      console.log("All bus locations updated:", newBuses);
    };

    // Clear all buses
    const handleClearBusLocations = () => {
      console.log("Clearing all bus locations");
      setBusLocations([]);
    };

    // Socket listeners
    socket.on("busLocation", handleBusLocation);
    socket.on("allBusLocations", handleAllBusLocations);
    socket.on("clearBusLocations", handleClearBusLocations);

    // Cleanup
    return () => {
      socket.off("busLocation", handleBusLocation);
      socket.off("allBusLocations", handleAllBusLocations);
      socket.off("clearBusLocations", handleClearBusLocations);
    };
  }, []); // Empty dependency to run only once

  if(busLocations) console.log("Bus locations:", busLocations);
  if(userLocation) console.log("User location:", userLocation);
  return (
    <MapContainer
      center={userLocation ? [userLocation.lat, userLocation.lng] : [23.8103, 90.4125]} // Dhaka as fallback
      zoom={13}
      style={{ height: "700px", width: "100%" }}
      className="leaflet-container z-0 w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {userLocation && <CenterMap location={userLocation} />}

      {/* User marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Bus markers */}
      {busLocations.map((bus) => {
        const { latitude, longitude } = bus.currentLocation;
        if (typeof latitude !== "number" || typeof longitude !== "number") return null;

        return (
          <Marker
            key={`${bus.busId || ""}-${bus.route}`}
            position={[latitude, longitude]}
            icon={busIcon}
          >
            <Popup>
              <div>
                <h2>Route: {bus.route}</h2>
                <p>Passengers: {bus.passengers}</p>
                <p>Status: {bus.status}</p>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Optional Search Control */}
      <SearchControl />
    </MapContainer>
  );
};

export default MapComponent;
