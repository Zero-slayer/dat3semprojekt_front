import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from './FrontPage';
import About from './AboutPage';
import "./App.css"
import NavigationBar from './components/NavigationBar';

function App() {
  return (
      <div className="App">
      <FrontPage />
      </div>
  )

}
export default App;