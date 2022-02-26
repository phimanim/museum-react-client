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
    deleteExhibition(exhibitionId);
    history.push("/exhibitions");
  };

  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2>{data?.name}</h2>

        {data?.imageUrl && <img src={data?.imageUrl} />}
        {data?.description && <p>{data?.description}</p>}
        {data?.artist && <p>Artist: {data?.artist}</p>}
        {data?.curator && <p>Curator: {data?.curator}</p>}
        {data?.begginingDate && <p>Beggining Date: {data?.begginingDate}</p>}
        {data?.endDate && <p>End Date: {data?.endDate}</p>}
        {data?.museum && (
          <Link to={`/museums/${data?.museum._id}`}>
            Museum: {data?.museum.name}
          </Link>
        )}
        <Link to={`/exhibitions/${data?._id}/booking`}>Book your ticket</Link>
        <button onClick={handleDelete}>Delete</button>
      </Suspense>
      <Link to={`/exhibitions/${data?._id}/update`}>Update informations</Link>
    </div>
  );
}

export default Exhibition;
