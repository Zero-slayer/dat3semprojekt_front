import React from "react";
import "./AboutPage.css";

export default function About() {
  return (
    <div className="container">
      <h3>About Page</h3>
      <p>This Frontend App is part of our 3. semester SyS project</p>
      <p>On this page you can find related link, like GitHub and Google Docs</p>

      <div className="grid-container">
        <div class="grid-item">Links</div>
        <div class="grid-item">
          <a
            href="https://github.com/Zero-slayer/dat3semprojekt_front"
            target="_blank"
          >
            GitHub Repository
          </a>
        </div>
        <div class="grid-item">
          {" "}
          <a
            href="https://docs.google.com/document/d/1yB8zi1B2apYc0nog7afIf6f65vqAq8MkQbdHIruKi6o/edit?usp=sharing"
            target="_blank"
          >Docs Document</a>
        </div>
      </div>
    </div>
  );
}
