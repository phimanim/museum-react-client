import React from "react";
import { getMuseumById } from "../../api";
import { deleteMuseum } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { useParams, Link } from "react-router-dom";
import { Suspense } from "../../components";
import { useHistory } from "react-router-dom";

function Museum() {
  const { museumId } = useParams();
  const { data, loading, error } = useFetch(
    () => getMuseumById(museumId),
    [museumId]
  );
const history = useHistory();
 const handleDelete = () => {
        deleteMuseum(museumId)
        history.push("/museums");
 }
  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2>{data?.name}</h2>
        {data?.imageUrl && <img src={data?.imageUrl} />}
        <p>Address: {data?.address}</p>
        <p>Coordinates: {data?.coordinates}</p>
        <p>Phone: {data?.Phone}</p>
        {data?.exhibition?.map((e) => (
            <p value={e._id} key={e._id}>
              {e}
            </p>
          ))}
        <Link to={`/museums/${data?._id}/update`}>Update informations</Link>

        <button onClick={handleDelete}>
          Delete
        </button>
      </Suspense>
    
    </div>
  );
}

export default Museum;
