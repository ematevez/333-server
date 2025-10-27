const BASE_URL = import.meta.env.VITE_API_URL || "https://three32-server.onrender.com";

export const API = {
  students: `${BASE_URL}/api/students`,
  courses: `${BASE_URL}/api/courses`
};
