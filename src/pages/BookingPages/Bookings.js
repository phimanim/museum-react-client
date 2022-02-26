import React from "react";
import { getBookings } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { Link } from "react-router-dom";

function Bookings() {
  const { data, loading, error } = useFetch(getBookings);
  console.log("bookings:", data);
  return (
    <Suspense noData={!data && !loading} error={error} loading={loading}>
      <div>
        {data?.map((booking) => {
          return (
            <div key={booking._id}>
              {booking.exhibition?.name && (
                <p>{booking.exhibition?.name}</p>
              )}
              {booking.exhibition?.imageUrl && <img src={booking.exhibition?.imageUrl} />}
              {booking.date && <p>Date: {booking.date}</p>}
              {booking.hour && <p>Time: {booking.hour}</p>}
              <Link to={`/profile/${booking._id}`}>Details</Link>
              <hr />
            </div>
          );
        })}
      </div>
    </Suspense>
  );
}

export default Bookings;
