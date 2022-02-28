import React from "react";
import { getExhibitions } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { Link } from "react-router-dom";

function Exhibitions() {
  const { data, loading, error } = useFetch(getExhibitions);

  return (
    <Suspense noData={!data && !loading} error={error} loading={loading}>
      <div>
        {/* <h1>Exhibitions</h1> */}
        {data?.map((exhibition) => {
          return (
            <div className="Container" key={exhibition._id}>
              <a href={`/exhibitions/${exhibition._id}`}>
                <img
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    filter: "brightness(50%)",
                  }}
                  src={exhibition.imageUrl}
                />
              </a>
              <div className="BottomLeft">
                <h1
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "200%",
                  }}
                >
                  {exhibition.name}
                </h1>
              </div>
              
            </div>
          );
        })}
        <div className="AddingExhibition">
          <Link className="AddingLink" to="/new-exhibition">
            Add an exhibition
          </Link>
        </div>
      </div>
    </Suspense>
  );
}

export default Exhibitions;
