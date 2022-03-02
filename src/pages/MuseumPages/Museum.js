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
    <div className="MuseumCard">
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2
          style={{
            fontSize: "4em",
            margin: "0",
          }}
        >
          {data?.name}
        </h2>
        {data?.imageUrl && <img src={data?.imageUrl} />}
        {data?.address && <p>Address: {data?.address}</p>}
        {data?.phone && <p>Phone: 0{data?.phone}</p>}

        <div style={{ height: "50px" }} className="SlidingContainer">
          <span style={{ fontSize: "50px" }} className="SlideRight">
            Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;
          </span>
          <span style={{ fontSize: "50px" }} className="SlideRight">
            Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;
          </span>
        </div>

        {exhibition?.map((e) => (
          <div key={e._id} className="Container">
            <img
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                filter: "brightness(50%)",
              }}
              src={e.imageUrl}
            />
            <div className="BottomLeft">
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "200%",
                }}
                to={`/exhibitions/${e?._id}`}
              >
                {e.name}
              </Link>
            </div>
          </div>
        ))}


        <div className="ButtonContainer">
        <Link
          style={{
            color: "white",
            width: "150px",
            padding: "15px",
            margin: "15px",
            textDecoration: "none",
            border: "solid white",
            textTransform:"uppercase",
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to={`/museums/${data?._id}/update`}
        >
          Update Museum
        </Link>
        <button style={{
            color: "white",
            width: "150px",
            padding: "15px",
            margin: "15px",
            textDecoration: "none",
            border: "solid white",
            textTransform:"uppercase",
            backgroundColor:"black"
          }}
          onClick={handleDelete}>Delete</button>
        </div>
       
       
      </Suspense>
    </div>
  );
}

export default Museum;
