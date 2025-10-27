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

function App() {
  // --- Estudiantes ---
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // --- Cursos ---
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const loadCourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
  };

  useEffect(() => {
    loadStudents();
    loadCourses();
  }, []);

  // --- CRUD Estudiantes ---
  const handleSaveStudent = async (data) => {
    selectedStudent
      ? await updateStudent(selectedStudent._id, data)
      : await createStudent(data);
    loadStudents();
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("¿Eliminar este estudiante?")) {
      await deleteStudent(id);
      loadStudents();
    }
  };

  // --- CRUD Cursos ---
  const handleSaveCourse = async (data) => {
    selectedCourse
      ? await updateCourse(selectedCourse._id, data)
      : await createCourse(data);
    loadCourses();
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("¿Eliminar este curso?")) {
      await deleteCourse(id);
      loadCourses();
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
