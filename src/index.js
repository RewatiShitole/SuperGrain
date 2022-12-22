import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Dashboard from './Components/Dashboard'
import Playground from './Components/Playground'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ height: 800 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/Playground"
            element={
                <Playground />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);


