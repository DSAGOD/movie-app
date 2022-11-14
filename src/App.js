import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import Banner from "./component/Banner";
import Movies from "./component/Movies";
import Favourite from "./component/Favourite";
import { BrowserRouter as Router, Route ,  Switch, BrowserRouter, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route exact path='/' element={<Movies/> } />
      <Route exact path='/favourites' element={<Favourite/>} />
    
      {/* <Banner/>
      
      <Movies/>
      <Favourite/> */}
      </Routes>
    </Router>
  );
}

export default App;
