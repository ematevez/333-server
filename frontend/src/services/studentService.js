// src/services/studentService.js
import axios from "axios";
import { API } from "./api";

export const getStudents = () => axios.get(API.students);

export const createStudent = async (data) => {
  try {
    const response = await axios.post(API.students, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    // Imprimimos el error para verlo en la consola y lo lanzamos para que el componente lo maneje
    console.error("Error en createStudent:", error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const updateStudent = async (id, data) => {
  try {
    const response = await axios.put(`${API.students}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error("Error en updateStudent:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteStudent = (id) => axios.delete(`${API.students}/${id}`);