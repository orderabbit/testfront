import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './board/main';
import Write from 'board/write';
import { MAIN_PATH, WRITE_PATH, UPDATE_PATH } from './constant';
import Update from 'board/update';



function App() {
  return (
    <Routes>
      <Route path={MAIN_PATH()} element={<Home />} />
      <Route path={WRITE_PATH()} element={<Write />}/>
      <Route path={UPDATE_PATH(':Number')} element={<Update />} />
    </Routes>
  )


}

export default App;
