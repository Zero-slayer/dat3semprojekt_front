import React from 'react';
import '../NavigationBar.css';
import { Link } from "react-router-dom";

export default function NavigationBar() {

        return (
            <div id="navbar">
                <ul class="nav justify-content-center ">
                <li class="nav-item" to="/">
                    <Link className="navBarLink" to="/">Home </Link>
                </li>
                <li class="nav-item" to>
                    <Link className="navBarLink" to="/placeholder">Placeholder </Link>
                </li>
                <li class="nav-item">
                    <Link className="navBarLink" to="/placeholder">Placeholder </Link>
                </li>
                <li class="nav-item">
                    <Link className="navBarLink" to="/about">About </Link>
                </li>
                </ul>
            </div>
        )
}