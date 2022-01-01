import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import FetchInFromJSON from "./views/fetch-in-from-json";

import "./App.css";

function App() {
  const home = <Home />
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/fetch-in-json">从JSON中获取数据</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={home} />
        <Route path="/fetch-in-json" element={<FetchInFromJSON />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
