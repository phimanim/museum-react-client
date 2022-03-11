import React from "react";
import { getBookings } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { Suspense } from "../../components";

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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
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
                  {booking.date && (
                    <p
                      style={{
                        margin: "5px",
                      }}
                    >
                      {booking.date.split("T")[0].replaceAll("-", "/")}
                    </p>
                  )}
                  {booking.date && (
                    <p
                      style={{
                        margin: "5px",
                      }}
                    >
                      {
                        booking.date
                          .split("T")[1]
                          .replaceAll("-", "/")
                          .split(":")[1]
                      }
                      :
                      {
                        booking.date
                          .split("T")[1]
                          .replaceAll("-", "/")
                          .split(":")[0]
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Suspense>
  );
}

export default Bookings;
