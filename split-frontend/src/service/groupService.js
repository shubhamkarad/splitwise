import axios from "axios";

const API_URL = "http://localhost:3200/api";

const token = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const getGroups = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/groups`);
    return response.data;
  } catch (error) {
    console.error("Failed to load groups", error);
  }
};
export const getGroupDetails = async (groupId) => {
  try {
    const response = await apiClient.get(`${API_URL}/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to load groups", error);
  }
};
