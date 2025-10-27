import axios from "axios";
import { API } from "./api";

export const getCourses = () => axios.get(API.courses);
export const createCourse = (data) => axios.post(API.courses, data);
export const updateCourse = (id, data) => axios.put(`${API.courses}/${id}`, data);
export const deleteCourse = (id) => axios.delete(`${API.courses}/${id}`);
