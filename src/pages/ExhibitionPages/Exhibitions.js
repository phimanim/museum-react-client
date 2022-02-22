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
      <h1>Exhibitions</h1>
      {data?.map((exhibition) => {
        return (
          <div key={exhibition._id}>
            <p>{exhibition.name}</p>
            <img src={exhibition.imageUrl} />
            <Link to={`/exhibitions/${exhibition._id}`}>Details</Link>
            <hr />
          </div>
           
        );
      })}
      <Link className="NavbarLink" to="/new-exhibition">
          Add an exhibition
        </Link>
    </div>
    </Suspense>
  );
}

export default Exhibitions;
