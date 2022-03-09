import React from "react";
import { getLikes, deleteLike } from "../api";
import { useFetch } from "../hooks/useFetch";
import { Suspense } from "../components";
import { useHistory } from "react-router-dom";

function Likes() {
  const { data, loading, error } = useFetch(getLikes);
  console.log("likes:", data);
  const history = useHistory();
  
  return (
    <Suspense noData={!data && !loading} error={error} loading={loading}>
      <div>
        {data?.map((like) => {
          const handleDelete = () => {
            deleteLike(like._id);
            history.push("/exhibitions");

          };
          return (
            <div className="Container" key={like._id}>
              {like.exhibition?.imageUrl && (
                <a href={`/profile/${like._id}`}>
                  <img
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      filter: "brightness(50%)",
                    }}
                    src={like.exhibition?.imageUrl}
                  />
                </a>
              )}
              <div className="ImgCentered">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                {like.exhibition?.name && (
                  <a
                    style={{
                      textDecoration: "none",
                    }}
                    href={`/exhibitions/${like.exhibition?._id}`}
                  >
                    <h1
                      style={{
                        color: "white",
                        fontSize: "200%",
                      }}
                    >
                      {like.exhibition?.name}
                    </h1>
                  </a>
                )}
                 <button style={{
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            textDecoration: "none",
            backgroundColor: "black",
            border: "none",
            fontSize: "15px",
            cursor: "pointer",
          }} onClick={handleDelete}>Unsave</button>
          </div>
              </div>
              <div>
                
           
              </div>
            </div>
            
          );
        })}
      </div>
    </Suspense>
  );
}

export default Likes;
