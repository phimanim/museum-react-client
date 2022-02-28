import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="Navbar">
        <ul className="NavbarDiv">
          <li>
            <Link className="NavbarLink" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="NavbarLink" to="/exhibitions">
              Exhibitions
            </Link>
          </li>
          <li>
            <Link className="NavbarLink MuseumLink" to="/museums">
              Museums
            </Link>
          </li>
          <li>
            <Link className="NavbarLink" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="NavbarLink" to="/map">
              Museums Map
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="Navbar">
      <Link className="NavbarLink" to="/login">
        Login
      </Link>
      <Link className="NavbarLink" style={{ marginLeft: "15px" }} to="/signup">
        Signup
      </Link>
    </div>
  );
}

export default Navbar;
