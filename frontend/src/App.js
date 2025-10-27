// App.js
import { useState, useEffect } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "./services/studentService";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from "./services/courseService";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";

import axios from "axios";
import { API } from "./services/api";

function App() {
  // --- Estudiantes ---
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // --- Cursos ---
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  };

  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  useEffect(() => {
    // 🔹 Ping inicial para “despertar” el servidor Render
    axios
      .get(API.students)
      .then(() => console.log("Servidor Render activo ✅"))
      .catch(() => console.log("Intentando conectar con el servidor..."));

    // 🔹 Cargar datos cuando el servidor responde
    loadStudents();
    loadCourses();
  }, []);

  // --- CRUD Estudiantes ---
  const handleSaveStudent = async (data) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent._id, data);
      } else {
        await createStudent(data);
      }
      // Si todo fue bien, recargamos la lista y limpiamos la selección
      loadStudents();
      setSelectedStudent(null);
    } catch (error) {
      // Si algo falla, lanzamos el error para que el StudentForm lo capture y muestre
      console.error("Error en App.js al guardar estudiante:", error);
      throw error;
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("¿Eliminar este estudiante?")) {
      try {
        await deleteStudent(id);
        loadStudents();
      } catch (error) {
        console.error("Error al eliminar estudiante:", error);
        alert("No se pudo eliminar el estudiante.");
      }
    }
  };

  // --- CRUD Cursos ---
  const handleSaveCourse = async (data) => {
    try {
      if (selectedCourse) {
        await updateCourse(selectedCourse._id, data);
      } else {
        await createCourse(data);
      }
      // Si todo fue bien, recargamos la lista y limpiamos la selección
      loadCourses();
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error en App.js al guardar curso:", error);
      throw error;
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("¿Eliminar este curso?")) {
      try {
        await deleteCourse(id);
        loadCourses();
      } catch (error) {
        console.error("Error al eliminar curso:", error);
        alert("No se pudo eliminar el curso.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Gestión Educativa 332</h1>

      <section>
        <StudentForm
          onSave={handleSaveStudent}
          selected={selectedStudent}
          clearSelection={() => setSelectedStudent(null)}
        />
        <StudentList
          students={students}
          onEdit={setSelectedStudent}
          onDelete={handleDeleteStudent}
        />
      </section>

      <hr />

      <section>
        <CourseForm
          onSave={handleSaveCourse}
          selected={selectedCourse}
          clearSelection={() => setSelectedCourse(null)}
        />
        <CourseList
          courses={courses}
          onEdit={setSelectedCourse}
          onDelete={handleDeleteCourse}
        />
      </section>
    </div>
  );
}

export default App;