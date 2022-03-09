import React from "react";
import { getBookingById, deleteBooking, getbookingById } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { useParams, Link, useHistory } from "react-router-dom";

function Booking() {
  const { bookingId } = useParams();
  const { data, loading, error } = useFetch(
    () => getBookingById(bookingId),
    [bookingId]
  );

  const history = useHistory();
  const handleDelete = () => {
    deleteBooking(bookingId);
    history.push("/profile");
  };

  return (
<div>      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2 style={{
                fontSize: "4em",
                margin: "0",
                overflow: "auto",
              }}>{data?.exhibition?.name}</h2>
        <p>Booked for {data?.date.split("T")[0].replaceAll('-', '/')}</p>
        <p>Booking time: {data?.date.split("T")[1].replaceAll('-', '/').split(':')[1]}:{data?.date.split("T")[1].replaceAll('-', '/').split(':')[0]}</p>
        <img
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
          src={data?.exhibition?.imageUrl}
        />
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {data?.exhibition?.description && (
            <p
              style={{
                textAlign: "justify",
                textJustify: "inter-character",
                width: "80%",
              }}
            >
              {data?.exhibition?.description}
            </p>
          )}
        </div>
        <div className="ButtonContainerRow"><button style={{
              color: "white",
              padding: "15px",
              margin: "15px",
              textDecoration: "none",
              border: "solid white",
              textTransform: "uppercase",
              backgroundColor: "black",
              fontSize: "15px",
              cursor: "pointer",
            }} onClick={handleDelete}>Cancel booking</button>
</div>
        
      </Suspense>
    </div>
  );
}

export default Booking;
