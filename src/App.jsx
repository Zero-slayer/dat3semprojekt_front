import React, { useState, useEffect } from 'react';
import FrontPage from './FrontPage'


function App() {
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div>
      <FrontPage />
    </div>
  )

}
export default App;