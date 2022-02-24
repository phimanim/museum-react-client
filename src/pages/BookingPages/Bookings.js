import React from "react";
import { getBookings } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";
import { Link } from "react-router-dom";

function Bookings() {
    const { data, loading, error } = useFetch(getBookings);

    return (
      <Suspense noData={!data && !loading} error={error} loading={loading}>
        <div>
      {data?.map((booking) => {
        return (
          <div key={booking._id}>
            <p>{booking.exhibition}</p>
            {data?.date && <p>Date: {data?.date}</p>}
            {data?.hour && <p>Time: {data?.hour}</p>}
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
