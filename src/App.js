import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import MovieDetails from './components/movieDetails';
import Checkout from './components/checkout';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="bg-gray-800 min-h-screen text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
