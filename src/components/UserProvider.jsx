import React, { createContext, useContext, useEffect, useState } from "react";
import { formatJWTTokenToUser } from "../utiles/tokenformat.utils";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Get token and userId
  const token = localStorage.getItem("token");
  const { userId } = token ? formatJWTTokenToUser(token) : {};

  useEffect(() => {
    if (!userId) {
      return; // Skip fetching if there's no userId
    }

    const fetchUser = async () => {
      try {
        const userInfo = await axios.get(
          `http://localhost:3000/api/auth/login/${userId}`
        );
        setUser(userInfo.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, [userId]);

  const login = (userInfo) => {
    setUser(userInfo);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("This context should be used only inside UserProvider");
  }
  return context;
}
