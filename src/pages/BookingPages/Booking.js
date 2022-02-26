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
        deleteBooking(bookingId)
        history.push("/bookings");
 }

  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2>{data?.exhibition?.name}</h2>
        <p>{data?.date}</p>

        <button onClick={handleDelete}>
          Delete
        </button>
      </Suspense>
    </div>
  );
}

export default Booking;
