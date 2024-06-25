import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();
const API_URL = "http://localhost:3200/api";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setToken(localStorage.getItem("token"));
    if (storedUser && token) {
      setUser(storedUser);
    }

    const fetchMembers = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/auth/users`);
        setMembers(response.data);
      } catch (error) {
        console.error("Failed to fetch members", error);
      }
    };

    fetchMembers();
  }, []);

  const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const login = async (user, token) => {
    try {
      // const response = await axios.post(`${API_URL}/auth/login`, {
      //   email,
      //   password,
      // });
      // const userData = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user?.name));
      localStorage.setItem("token", token);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await apiClient.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);
    } catch (err) {
      console.log("Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const createGroup = async (group) => {
    try {
      const response = await apiClient.post(`${API_URL}/groups`, group);
      const newGroup = response.data;
      console.log(response);
      setGroups([...groups, newGroup]);
      setActiveGroup(newGroup);
    } catch (error) {
      console.error("Failed to create group", error);
    }
  };

  const addMemberToGroup = async (groupId, membersArr) => {
    try {
      const response = await apiClient.post(
        `${API_URL}/groups/${groupId}/members`,
        membersArr
      );
      const updatedGroup = response.data;
      setGroups(
        groups.map((group) => (group.id === groupId ? updatedGroup : group))
      );
    } catch (error) {
      console.error("Failed to add member", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        groups,
        activeGroup,
        createGroup,
        addMemberToGroup,
        members,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  useContext(AuthContext);
};
