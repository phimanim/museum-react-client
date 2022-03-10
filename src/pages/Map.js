import React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { useFetch } from "../hooks/useFetch";
import { getMuseums } from "../api";
import { Suspense } from "../components";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";

function MapView() {
  const { data, loading, error } = useFetch(getMuseums);
  console.log(data);
  const MAPBOX_TOKEN = "pk.eyJ1IjoicGhpbWFuaW0iLCJhIjoiY2wwM3Q2d3kzMDVrbDNxbndnMGo5cXB1diJ9.657dbTJx6cGzk7A_71jRvA";
console.log("token:", MAPBOX_TOKEN);
  const [selectedMuseum, setSelectedMuseum] = React.useState(null);
  console.log(selectedMuseum);

  return (
    <div className="Map">
      <Map
        initialViewState={{
          latitude: 48.856614,
          longitude: 2.3522219,
          zoom: 12,
        }}
        style={{ width: "100%", height: 600 }}
        mapStyle="mapbox://styles/phimanim/cl09xqgsp004y15lbl027keh6"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Suspense noData={!data && !loading} error={error} loading={loading}>
          {data?.map((museum) => (
            <Marker
              key={museum._id}
              latitude={museum.latitude}
              longitude={museum.longitude}
            >
              <button
                style={{
                  display: "block",
                  borderRadius: "20px",
                  padding: "0",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#ffffff",
                }}
                className="marker-btn"
                onClick={() => {
                  setSelectedMuseum(museum);
                }}
              />
            </Marker>
          ))}

          {selectedMuseum ? (
            <Popup
              style={{
                color: "#000000",
                textDecoration: "none",
              }}
              latitude={selectedMuseum.latitude}
              longitude={selectedMuseum.longitude}
              onClose={() => setSelectedMuseum(null)}
              closeOnClick={false}
            >
              <div>
                <h2>{selectedMuseum.name}</h2>
                <p>{selectedMuseum.description}</p>
                <Link
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                  }}
                  to={`/museums/${selectedMuseum._id}`}
                >
                  Discover Museum
                </Link>
              </div>
            </Popup>
          ) : null}
        </Suspense>
      </Map>
    </div>
  );
}

export default MapView;