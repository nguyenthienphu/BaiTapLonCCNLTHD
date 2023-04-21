import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Trip from './components/Trip';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import { Container } from 'react-bootstrap';
import CarName from './components/CarName';
import CarNameDetails from './components/CarNameDetails';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Container>
        <Routes>
          <Route path='/' element={<Trip />}/>
          <Route path='/trip/:tripId/carname' element={<CarName />}/>
          <Route path='carname/:carnameId' element={<CarNameDetails />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
