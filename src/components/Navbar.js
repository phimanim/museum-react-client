import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="Navbar">
        <Link className="NavbarLink" to="/">Home</Link>
        <Link className="NavbarLink" to="/exhibitions">
          Exhibitions
        </Link>
        <Link className="NavbarLink" to="/museums">
         Museums
        </Link>
        <Link className="NavbarLink" to="/profile">
         Profile
        </Link>
        <Link className="NavbarLink" to="/map">
         Museum Map
        </Link>
       
      </div>
    );
  }

  return (
    <div className="Navbar">
      <Link className="NavbarLink" to="/login">Login</Link>
      <Link className="NavbarLink" style={{ marginLeft: "15px" }} to="/signup">
        Signup
      </Link>
    </div>
  );
}

export default Navbar;
