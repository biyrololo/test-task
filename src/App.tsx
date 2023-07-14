import React from 'react';
import MainPage from './MainPage'
import EditPage from './EditPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  axios.defaults.baseURL = 'http://localhost:8080';
  return (
    <>
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/edit" element={<EditPage />} />
          </Routes>
    </BrowserRouter>
    <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"/>
      </>
  );
}

export default App;
