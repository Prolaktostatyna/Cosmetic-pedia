import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import InBrand from "./Components/InBrand/InBrand";
import InProductType from "./Components/InProductType/InProductType";
import Breadcrumb from "./Components/Breadcrumb/Breadcrumb";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:brand" element={<InBrand />} />
          <Route path="/:brand/:productTypes" element={<InProductType />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
