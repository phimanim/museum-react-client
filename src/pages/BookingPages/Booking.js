import React from "react";
import { getBookingById } from "../../api";
import { deleteBooking } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Suspense } from "../../components";
import { useHistory } from "react-router-dom";

function Booking() {
  const { bookingId } = useParams();
  const { data, loading, error } = useFetch(
    () => getBookingById(bookingId),
    [bookingId]
  );
const history = useHistory();
 const handleDelete = () => {
        deleteBooking(bookingId)
        history.push("/profile");
 }

  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        <h2>{data?.exhibition}</h2>
        {data?.exhibition?.imageUrl && <img src={data?.exhibition?.imageUrl} />}
        <p>Date: {data?.date}</p>
        <p>Hour: {data?.hour}</p>
        <button onClick={handleDelete}>
          Delete
        </button>
      </Suspense>
    </div>
  );
}

export default Booking;
