import React, { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import NavBar from "../NavBar";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34],
});

const Map: React.FC = () => {
  const storedLat = localStorage.getItem("latitude");
  const storedLng = localStorage.getItem("longitude");

  const latitude = storedLat ? parseFloat(storedLat) : 20.5937;
  const longitude = storedLng ? parseFloat(storedLng) : 78.9629;

  return (
    <Fragment>
      <NavBar />
      <MapContainer
        center={[latitude, longitude]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </Fragment>
  );
};

export default Map;
