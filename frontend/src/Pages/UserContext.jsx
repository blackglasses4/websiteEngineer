import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [usernameUser, setUsernameUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUsernameUser(parsedUser?.username || null);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUsernameUser(user.username);
    setUserRole(user.is_admin ? "admin" : "user"); // Ustawiamy rolę
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUsernameUser(null);
    setUserRole(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ usernameUser, setUsernameUser, isLoggedIn, userRole, login ,logout }}>
      {children}
    </UserContext.Provider>
  );
};