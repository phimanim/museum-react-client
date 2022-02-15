import React from "react";
import { getMuseums } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { Link } from "react-router-dom";

function Museums() {
    const { data, loading, error } = useFetch(getMuseums);

    return (
      <Suspense noData={!data && !loading} error={error} loading={loading}>
        <div>
      <h1>Museums</h1>
      {data?.map((museum) => {
        return (
          <div key={museum.title}>
            <img src={museum.imageUrl} />
            <Link to={`/museums/${museum._id}`}>Details</Link>
            <hr />
          </div>
           
        );
      })}
      <Link className="NavbarLink" to="/new-museum">
          Add a new museum
        </Link>
    </div>
    </Suspense>
  );
}

export default Museums;
