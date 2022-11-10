import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header';
import Recipes from './Components/Recipes';
import NotFoundPage from './Components/NotFoundPage';
import Footer from './Components/Footer';
import CreateRecipe from './Components/CreateRecipe';
import { BrowserRouter, Link, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Header/>
      <hr />
      <Routes>
          <Route path="/" element={ <App/>}></Route>
          <Route path="/recipes" element={<Recipes />}></Route>
          <Route path="/create_recipe" element={ <CreateRecipe/>}></Route>
          <Route path="*" element={ <NotFoundPage/>}></Route>
        </Routes>
      <Footer />
    </React.StrictMode>
    
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
