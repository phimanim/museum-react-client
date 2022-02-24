import React from "react";
import { deleteMuseum, addExhibitions, getMuseumById } from "../../api";
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

  const [exhibition, setExhibition] = React.useState(null);

  async function getExhibitionData() {
    const { data } = await addExhibitions(museumId);
    setExhibition(data);
  }

  React.useEffect(() => {
    if (museumId) {
      getExhibitionData();
    }
  }, [museumId]);

  console.log("exhibition: ", exhibition);

  const history = useHistory();

  const handleDelete = () => {
    deleteMuseum(museumId);
    history.push("/museums");
  };
  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2>{data?.name}</h2>
        {data?.imageUrl && <img src={data?.imageUrl} />}
        {data?.address && <p>Address: {data?.address}</p>}
        {data?.phone && <p>Phone: 0{data?.phone}</p>}
        {exhibition?.map((e) => (
          <p value={e._id} key={e._id}>
            <Link to={`/exhibitions/${e?._id}`}>{e.name}</Link>
            <img src={e.imageUrl} />
          </p>
        ))}
        <Link to={`/museums/${data?._id}/update`}>Update informations</Link>
        <button onClick={handleDelete}>Delete</button>
      </Suspense>
    </div>
  );
}

export default Museum;
