import React from 'react';
import './styles/app.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/:id" element={<Main />} />
      <Route path='/' element={<Navigate to={`f${(+new Date()).toString(16)}`} />} />
    </Routes>
  );
}

export default App;
