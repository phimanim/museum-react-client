import React from "react";
import { useAuth } from "../components/AuthContext";
// import {getBookings} from "../api"
// import {useFetch} from "../hooks/useFetch"
// import { Link } from "react-router-dom";
import Bookings from "./BookingPages/Bookings";

function Home() {
  const { user, handleLogout } = useAuth();
  //const { data} = useFetch(getBookings);
  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user?.email}</p>
      <h3>My bookings</h3>
      <Bookings/>
      <button className="NavbarButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;