import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './UserContext';  // Import UserProvider
import Home from './components/home';
import MovieDetails from './components/movieDetails';
import Checkout from './components/checkout';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserProvider value={user}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="bg-gray-800 min-h-screen text-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
