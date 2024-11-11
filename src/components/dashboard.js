import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.email));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username); 
          } else {
            console.log("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user details: ", error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-4xl font-bold mb-6">Welcome, {username ? username : 'User'}!</h2>
        <p className="text-lg mb-8">You're logged in with the email: <span className="font-semibold">{auth.currentUser.email}</span></p>
        <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold">Enjoy exploring your dashboard.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
