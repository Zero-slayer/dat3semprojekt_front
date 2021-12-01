import React from "react";
import "../NavigationBar.css";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="nav">
      <ul className="nav-Links">
        <Link style={{ textDecoration: "none" }} to="/">
          <li className="nav-Link">Home</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/about">
          <li className="nav-Link">About</li>
        </Link>
      </ul>
    </div>
  );
}
