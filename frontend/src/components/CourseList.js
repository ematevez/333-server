const CourseList = ({ courses, onEdit, onDelete }) => (
  <div>
    <h2>Lista de Cursos</h2>
    {courses.length === 0 && <p>No hay cursos aún.</p>}
    <ul>
      {courses.map((c) => (
        <li key={c._id}>
          <strong>{c.title}</strong> — {c.teacher} ({c.hours}h)
          <button onClick={() => onEdit(c)}>✏️</button>
          <button onClick={() => onDelete(c._id)}>🗑️</button>
        </li>
      ))}
    </ul>
  </div>
);

export default CourseList;
