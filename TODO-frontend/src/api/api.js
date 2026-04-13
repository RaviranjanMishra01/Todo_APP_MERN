// const API = "https://todo-app-mern-1-cos6.onrender.com";
const API = "https://todo-app-mern-1-0ixp.onrender.com";


export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const wakeBackend = () => {
  fetch(`${API}/`).catch(() => {});
};

export default API;