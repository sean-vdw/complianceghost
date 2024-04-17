import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './components/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import RegisterForm from './components/RegisterForm';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
