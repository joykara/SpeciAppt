import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Hospitals from './routes/Hospitals.jsx';
import HospitalPage from './routes/HospitalPage.jsx';
import BookingPage from './routes/BookingPage.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

function App() {
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ScrollToTop>
      <Route path="/" component={Navbar} />
      <Route path="/" exact component={Hospitals} />
      <Route path="/hospital-page/:hospitalId" exact component={HospitalPage} />
      <Route path="/hospital-page/:hospitalId/:doctorId" exact component={BookingPage} />
    </ScrollToTop>
  </BrowserRouter>
};

export default App;
