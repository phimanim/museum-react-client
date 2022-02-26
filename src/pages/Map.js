import React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { useFetch } from "../hooks/useFetch";
import { getMuseums } from "../api";
import { Suspense } from "../components";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";
import museumPicker from "../assets/museum.png";

function MapView() {
  const { data, loading, error } = useFetch(getMuseums);
  console.log(data);
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  const [selectedMuseum, setSelectedMuseum] = React.useState(null);
  console.log(selectedMuseum);

  return (
    <Map
      initialViewState={{
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 12,
      }}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
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
                backgroundColor: "#0066ff",
              }}
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedMuseum(museum);
              }}
            />
          </Marker>
        ))}
        {selectedMuseum ? (
          <Popup
            latitude={selectedMuseum.latitude}
            longitude={selectedMuseum.longitude}
            onClose={() => {
              setSelectedMuseum(null);
            }}
          >
            <div>
              <h2>{selectedMuseum.name}</h2>
              <p>{selectedMuseum.description}</p>
              <Link to={`/museums/${selectedMuseum._id}`}>Discover Museum</Link>
            </div>
          </Popup>
        ) : null}
      </Suspense>
    </Map>
  );
}

export default MapView;
