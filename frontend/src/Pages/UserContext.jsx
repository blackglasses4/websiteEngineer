import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [usernameUser, setUsernameUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
   

    if (loggedUser && token) {
      const parsedUser = JSON.parse(loggedUser);
      setUsernameUser(parsedUser?.username || null);
      setUserRole(parsedUser?.admin ? 'admin' : 'user');
      setAccessToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUsernameUser(user.username);
    setUserRole(user.is_admin ? 'admin' : 'user');
    setAccessToken(token);
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUsernameUser(null);
    setUserRole(null);
    setAccessToken(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ usernameUser, setUsernameUser, isLoggedIn, accessToken, userRole, login , logout }}>
      {children}
    </UserContext.Provider>
  );
};