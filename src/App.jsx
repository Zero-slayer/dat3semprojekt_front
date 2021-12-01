import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from './FrontPage';
import About from './AboutPage';
import "./App.css"
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar/>
        <Routes>
          <Route path="/" exact element ={<FrontPage/>}/>
          <Route path="/about" exact element ={<About/>}/>
        </Routes>
      </div>
    </Router>
  )

}
export default App;