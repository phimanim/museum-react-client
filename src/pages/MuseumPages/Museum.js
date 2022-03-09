import React from "react";
import { deleteMuseum, addExhibitions, getMuseumById } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { useParams, Link } from "react-router-dom";
import { Suspense } from "../../components";
import { useHistory } from "react-router-dom";
import { AuthProvider } from "../../components/AuthContext";

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
    <div className="Museum">
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <div className="MuseumCard">
          <div className="MuseumCardOne">
          <h2
              style={{
                fontSize: "4em",
                margin: "0",
                overflow: "auto",
              }}
            >
              {data?.name}
            </h2>
            {data?.address && (
              <p
                style={{
                  fontSize: "1.3em",
                  margin: "0",
                }}
              >
                {data?.address}
              </p>
            )}
            {data?.imageUrl && (
              <img
                style={{
                  margin: "10px 0",
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  filter: "brightness(50%)",
                }}
                src={data?.imageUrl}
              />
            )}
            
            
          </div>
        </div>
<div style={{ height: "50px" }} className="SlidingContainer">
              <span style={{ fontSize: "50px" }} className="SlideRight">
                Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;
              </span>
              <span style={{ fontSize: "50px" }} className="SlideRight">
                Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;Exhibitions&nbsp;
              </span>
            </div>
        {exhibition?.map((e) => (
          <div>
            
            <div key={e._id} className="Container">
            {e?.imageUrl && ( <a href={`/exhibitions/${e?._id}`}>
              <img
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  filter: "brightness(50%)",
                }}
                src={e.imageUrl}
              /></a>)}
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
          </div>
        ))}

        <div className="MuseumCardTwo">
          <div className="ButtonContainer">
            <Link
              style={{
                color: "white",
                width: "150px",
                padding: "7px",
                margin: "15px",
                backgroundColor: "black",
                textDecoration: "none",
                border: "solid white",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
              }}
              to={`/museums/${data?._id}/update`}
            >
              Update Museum
            </Link>
            <button
              style={{
                color: "white",
                width: "150px",
                padding: "7px",
                margin: "15px",
                textDecoration: "none",
                border: "solid white",
                textTransform: "uppercase",
                backgroundColor: "black",
                fontSize: "15px",
              }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Museum;
