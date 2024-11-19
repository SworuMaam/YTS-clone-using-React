import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { useUser } from '../UserContext';

function Dashboard() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [setUser, navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Dashboard</h2>
        {user ? (
          <div>
            <p className="text-white mb-4">Welcome, {user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
