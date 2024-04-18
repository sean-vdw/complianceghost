import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './components/home';
import LandingPage from './components/LandingPage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import RegisterForm from './components/RegisterForm';
import SignIn from './components/SignIn';

function UserRoutes() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
