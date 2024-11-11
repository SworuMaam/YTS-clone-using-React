import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const isPhoneValid = (phone) => {
    const phonePattern = /^[0-9]{10}$/; 
    return phonePattern.test(phone);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isPhoneValid(phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        phone: phone,
        email: normalizedEmail,
      });

      navigate('/dashboard');
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required
            className="w-full p-3 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required
            className="w-full p-3 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required
            className="w-full p-3 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required
            className="w-full p-3 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-white">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
