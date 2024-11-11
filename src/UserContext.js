import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// UserProvider component to wrap around your application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
