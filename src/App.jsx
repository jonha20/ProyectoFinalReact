import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import basketJSON from "../utils/prueba.json";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";

function App() {
  const [coords, setValue] = useState();
  const [pitch, setPitch] = useState([]);

  useEffect(() => {
    const fetchDefaultCity = async () => {
      try {
        const res = await axios.get(
          `https://ipinfo.io/json?token=${import.meta.env.VITE_LOCATION}`
        );
        const data = await res.data.loc;
        const loc = data.split(",").map(Number);
        //console.log(loc); // <-- Añade esto para depurar
        setValue(loc);
      } catch (error) {
        console.error("Error fetching location:", error);
        setValue([40.4168, -3.7038]);
      }
    };
    fetchDefaultCity();
  }, []);

  useEffect(() => {
    console.log("basketJSON", basketJSON); // <-- Añade esto para depurar
    setPitch(basketJSON.features || []);
  }, []);
  if (!coords) return null;

  return (
    <>
      <MapContainer
        className="full-map"
        center={coords}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pitch &&
          pitch.map((feature, idx) => (
            <Marker
              key={idx}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ]}
            >
              <Popup>
                <div>
                  <strong>Campo:</strong>{" "}
                  {feature.properties.leisure ?? "Sin dato"}
                  <br />
                  {feature.properties.surface && (
                    <>
                      <strong>Superficie:</strong> {feature.properties.surface}
                      <br />
                    </>
                    
                  )}
                  
                  {feature.properties.covered && (
                    <>
                      <strong>Cubierta:</strong> {feature.properties.covered}
                      <br />
                    </>
                  )}
                  {feature.properties.access && (
                    <>
                      <strong>Acceso:</strong> {feature.properties.access}
                      <br />
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
}

export default App;
