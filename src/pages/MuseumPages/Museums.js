import React from "react";
import { getMuseums} from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { Link } from "react-router-dom";

function Museums() {
    const { data, loading, error } = useFetch(getMuseums);
    
    return (
      <div>
        <Link to={`/map`}>Map</Link>
        <Suspense noData={!data && !loading} error={error} loading={loading}>
        <div>
      <h1>Museums</h1>
      {data?.map((museum) => {
        return (
          <div key={museum._id}>
            <img src={museum.imageUrl} />
            <Link to={`/museums/${museum._id}`}>{museum.name}</Link>
            <hr />
          </div>
           
        );
      })}
      <Link className="NavbarLink" to="/new-museum">
          Add a new museum
        </Link>
    </div>
    </Suspense>
    
      </div>
      
    

  );
}

export default Museums;
