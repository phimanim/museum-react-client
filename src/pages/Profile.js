import React from "react";
import { useAuth } from "../components/AuthContext";

import Bookings from "./BookingPages/Bookings";
import Likes from "./Likes";
import "../assets/Sliding.scss";

function Home() {
  const { handleLogout } = useAuth();
  //const { data} = useFetch(getBookings);
  return (
    <div>
      <div className="ProfileCard">
        <div style={{ height: "110px" }}className="SlidingContainer">
          <span style={{ fontSize: "100px" }} className="SlideLeft">
            Bookings Bookings Bookings Bookings Bookings&nbsp;
          </span>
          <span style={{ fontSize: "100px" }} className="SlideLeft">
            Bookings Bookings Bookings Bookings Bookings&nbsp;
          </span>
        </div>
      </div>

      <Bookings />
      <div style={{ height: "110px" }} className="SlidingContainer">
        <span style={{ fontSize: "100px" }} className="SlideRight t1">
          likes likes likes likes likes likes likes likes likes likes
          likes&nbsp;
        </span>
        <span style={{ fontSize: "100px" }} className="SlideRight t2">
          likes likes likes likes likes likes likes likes likes likes
          likes&nbsp;
        </span>
      </div>
      <Likes />
      <button className="NavbarButton" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
