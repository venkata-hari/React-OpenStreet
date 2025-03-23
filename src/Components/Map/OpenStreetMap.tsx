import React, { Fragment } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "../NavBar";

const Map: React.FC = () => {
  const storedLat = localStorage.getItem("latitude");
  const storedLng = localStorage.getItem("longitude");

  const latitude = storedLat ? parseFloat(storedLat) : 20.5937;
  const longitude = storedLng ? parseFloat(storedLng) : 78.9629;

  return (
    <Fragment>
      <NavBar/>
    <MapContainer 
      center={[latitude, longitude]} 
      zoom={5} 
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
    </Fragment>
  );
};

export default Map;
