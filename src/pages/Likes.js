import React from "react";
import { getLikes } from "../api";
import { useFetch } from "../hooks/useFetch";
import { Suspense } from "../components";

function Likes() {
  const { data, loading, error } = useFetch(getLikes);
  console.log("likes:", data);
  return (
    <Suspense noData={!data && !loading} error={error} loading={loading}>
      <div>
        {data?.map((like) => {
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
                {like.exhibition?.name && (
                  <a
                    style={{
                      textDecoration: "none",
                    }}
                    href={`/profile/${like._id}`}
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
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </Suspense>
  );
}

export default Likes;
