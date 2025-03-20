//// src/App.js
//import React from "react";
//import Header from "./Header";
//import CoinList from "./components/CoinList";
//import "./App.css";
//
//function App() {
//  return (
//    <div className="App">
//      <Header />
//      <CoinList />
//    </div>
//  );
//}
//
//export default App;



// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import CoinList from "./components/CoinList";
import MyCollection from "./MyCollection";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/mycollection" element={<MyCollection />} />
      </Routes>
    </Router>
  );
}

export default App;
