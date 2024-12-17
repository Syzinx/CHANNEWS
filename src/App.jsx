import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";
import Programming from "./pages/Programming";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import Covid19 from "./pages/covid19";
import Footer from "./components/Footer";
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <HeroSection />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/covid19" element={<Covid19 />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
