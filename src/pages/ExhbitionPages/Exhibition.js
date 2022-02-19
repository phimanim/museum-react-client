import React from "react";
import { getExhibitionById } from "../../api";
import { deleteExhibition } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Suspense } from "../../components";
import { useHistory, Link } from "react-router-dom";


function Exhibition() {
  const { exhibitionId } = useParams();
  const { data, loading, error } = useFetch(
    () => getExhibitionById(exhibitionId),
    [exhibitionId]
  );
const history = useHistory();
 const handleDelete = () => {
        deleteExhibition(exhibitionId)
        history.push("/exhibitions");
 }

  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2>{data?.name}</h2>
        {data?.imageUrl && <img src={data?.imageUrl} />}
        <p>Description: {data?.Description}</p>
        <p>Artist: {data?.Artist}</p>
        <p>Curator: {data?.Curator}</p>
        <p>Beggining Date: {data?.begginingDate}</p>
        <p>End Date: {data?.endDate}</p>
        {data?.museum && <Link to={`/museums/${data?.museum._id}`}>Museum: {data?.museum.name}</Link>}
       
        <button onClick={handleDelete}>
          Delete
        </button>
      </Suspense>
    </div>
  );
}

export default Exhibition;
