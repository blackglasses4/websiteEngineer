import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [usernameUser, setUsernameUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUsernameUser(parsedUser?.username || null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ usernameUser, setUsernameUser }}>
      {children}
    </UserContext.Provider>
  );
};