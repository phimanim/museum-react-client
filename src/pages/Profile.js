import React from "react";
import { useAuth } from "../components/AuthContext";

import Bookings from "./BookingPages/Bookings";
import Likes from "./Likes";
import "../assets/Sliding.scss";

function Profile() {
  const { handleLogout } = useAuth();
  //const { data} = useFetch(getBookings);
  return (
    <div>
      <div className="ProfileCard">
        <div style={{ height: "50px" }}className="SlidingContainer">
          <span style={{ fontSize: "50px" }} className="SlideLeft">
            Bookings Bookings Bookings Bookings Bookings&nbsp;
          </span>
          <span style={{ fontSize: "50px" }} className="SlideLeft">
            Bookings Bookings Bookings Bookings Bookings&nbsp;
          </span>
        </div>
      </div>

      <Bookings />
      <div style={{ height: "50px" }} className="SlidingContainer">
        <span style={{ fontSize: "50px" }} className="SlideRight t1">
          likes likes likes likes likes likes likes likes likes likes
          likes&nbsp;
        </span>
        <span style={{ fontSize: "50px" }} className="SlideRight t2">
          likes likes likes likes likes likes likes likes likes likes
          likes&nbsp;
        </span>
      </div>
      <Likes />
      <div className="ButtonContainerRow">
        <button  style={{
              color: "white",
              padding: "15px",
              margin: "15px",
              textDecoration: "none",
              border: "solid white",
              textTransform: "uppercase",
              backgroundColor: "black",
              fontSize: "15px",
              cursor: "pointer",
            }} className="NavbarButton" onClick={handleLogout}>
        Logout
      </button>
      </div>
      
    </div>
  );
}

export default Profile;
