import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import FetchInFromJSON from "./views/fetch-in-from-json";
import Report from "./views/report";
import UpdateData from "./views/update-data";
import UpdateDataV2 from './views/update-data-v2'

import "./App.css";

function App() {
  return (
    <HashRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">数据更新记录,每条记录取最新2000条</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fetch-in-json" element={<FetchInFromJSON />} />
        <Route path="/report" element={<Report />}></Route>
        <Route path="/update-data" element={<UpdateData />}></Route>
        <Route path="/update-data-v2" element={<UpdateDataV2 />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
