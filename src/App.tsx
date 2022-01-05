import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import FetchInFromJSON from "./views/fetch-in-from-json";
import Report from "./views/report";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/fetch-in-json">从JSON中获取数据</Link>
            </li>
            <li>
              <Link to="/report">报表</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fetch-in-json" element={<FetchInFromJSON />} />
        <Route path="/report" element={<Report />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
