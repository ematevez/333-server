// src/services/studentService.js
import axios from "axios";
import { API } from "./api";

export const getStudents = () => axios.get(API.students);
export const createStudent = (data) => axios.post(API.students, data);
export const updateStudent = (id, data) => axios.put(`${API.students}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API.students}/${id}`);
