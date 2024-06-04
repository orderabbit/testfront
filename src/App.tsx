import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './board/main';
import Write from 'board/write';
import { MAIN_PATH, WRITE_PATH, UPDATE_PATH, DETAIL_PATH } from './constants';
import Update from 'board/update';



function App() {
  return (
    <Routes>
      <Route path={MAIN_PATH()} element={<Home boardListItem={{
        itemNumber: 0,
        title: '',
        content: ''
      }} />} />
      <Route path={WRITE_PATH()} element={<Write />}/>
      {/* <Route path={DETAIL_PATH(':Number')} element={<Detail />} /> */}
      <Route path={UPDATE_PATH(':Number')} element={<Update />} />
    </Routes>
  )


}

export default App;
