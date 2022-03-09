import React from "react";
import { getLikeById, deleteLike } from "../api";
import { useFetch } from "../hooks/useFetch";
import { Suspense } from "../components";
import { useParams } from "react-router-dom";
function Like() {
    const { likeId } = useParams();

  const { data, loading, error } = useFetch(
    () => getLikeById(likeId),
    [likeId]
  );

  const handleDelete = () => {
    deleteLike(likeId);
  };
          return (
            <div>
            <button style={{
            color: "white",
            padding: "15px",
            margin: "15px",
            textDecoration: "none",
            border: "solid white",
            textTransform: "uppercase",
            backgroundColor: "black",
            fontSize: "15px",
            cursor: "pointer",
          }} onClick={handleDelete}>Cancel booking</button>
              </div> 
  );
}

export default Like;
