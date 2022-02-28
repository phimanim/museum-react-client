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
            <div className="Container" key={booking._id}>
              {booking.exhibition?.imageUrl && (
                <a href={`/profile/${booking._id}`}>
                  <img
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      filter: "brightness(50%)",
                    }}
                    src={booking.exhibition?.imageUrl}
                  />
                </a>
              )}
              <div className="ImgCentered">
                {booking.exhibition?.name && (
                  <a
                    style={{
                      textDecoration: "none",
                    }}
                    href={`/profile/${booking._id}`}
                  >
                    <h1
                      style={{
                        color: "white",
                        fontSize: "200%",
                      }}
                    >
                      {booking.exhibition?.name}
                    </h1>
                  </a>
                )}
                {booking.date && <p>Date: {booking.date}</p>}
                {booking.hour && <p>Time: {booking.hour}</p>}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </Suspense>
  );
}

export default Bookings;
