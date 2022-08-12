import './App.css';
import Login from './components/auth/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom"
import User from './components/User';

function App() {
  
  
  return (
    <div>
      
      <Router>
        <Routes>
        
        <Route exact path="/user" element={<User />} /> 
       
        <Route exact path="/" element={<Login/>} />
        
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
