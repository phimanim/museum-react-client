import React from "react";
import { getExhibitionById, deleteExhibition, createLike } from "../../api";
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

  const [state, setState] = React.useState({
    exhibition: exhibitionId,
  });
  const handleLike = async (event) => {
    event.preventDefault();
    const { data } = await createLike(state);
    console.log("liked exhibition:", data);
    history.push("/profile");

  };

  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <div>
          <h2
            style={{
              fontSize: "4em",
              overflow: "auto",
              margin: "10px"
            }}
          >
            {data?.name}{" "}
          </h2>
          <p
              style={{
                fontSize: "20px",
                margin: "10px"
              }}
            >
              {data?.begginingDate?.split("T")[0].replaceAll('-', '/')} -{" "}
              {data?.endDate?.split("T")[0].replaceAll('-', '/')}
            </p>
        </div>

        {data?.imageUrl && (
          <img
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
            src={data?.imageUrl}
          />
        )}
        {data?.description && (
          <p
            style={{
              margin: "40px 40px 0",
              overflow: "auto",
            }}
          >
            {data?.description}
          </p>
        )}
        <div
          style={{
            margin: " 0 40px",
            overflow: "auto",
          }}
        >
          {data?.artist && <p>Artist: {data?.artist}</p>}
          {data?.curator && <p>Curator: {data?.curator}</p>}
        </div>

        {data?.museum && (
          <div key={data?.museum?._id} className="Container">
            <a href={`/museums/${data?.museum?._id}`}>
              <img
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  filter: "brightness(50%)",
                }}
                src={data?.museum?.imageUrl}
              />
            </a>
            <div className="BottomLeft">
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "200%",
                }}
                to={`/museums/${data?.museum._id}`}
              >
                {data?.museum?.name}
              </Link>
            </div>
          </div>
        )}
        <div className="ButtonContainerRow">
          <Link
            style={{
              color: "white",
              padding: "15px",
              margin: "15px",
              backgroundColor:"black",
              textDecoration: "none",
              border: "solid white",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
            }}
            to={`/exhibitions/${data?._id}/booking`}
          >
            Book your ticket
          </Link>
          <form onSubmit={handleLike}>
            <button
              style={{
                color: "white",
                padding: "15px",
                margin: "15px",
                textDecoration: "none",
                border: "solid white",
                textTransform: "uppercase",
                backgroundColor: "black",
                fontSize: "15px",
                cursor: "pointer",
                              backgroundColor:"black",

              }}
              type="submit"
            >
              Save Exhibition
            </button>
          </form>
          <Link
            style={{
              color: "white",
              padding: "15px",
              margin: "15px",
              textDecoration: "none",
              border: "solid white",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              backgroundColor:"black",

            }}
            to={`/exhibitions/${data?._id}/update`}
          >
            Update informations
          </Link>

          <button
            style={{
              color: "white",
              padding: "15px",
              margin: "15px",
              textDecoration: "none",
              border: "solid white",
              textTransform: "uppercase",
              backgroundColor: "black",
              fontSize: "15px",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Suspense>
    </div>
  );
}

export default Exhibition;
