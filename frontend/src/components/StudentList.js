const StudentList = ({ students, onEdit, onDelete }) => (
  <div>
    <h2>Lista de Estudiantes</h2>
    {students.length === 0 && <p>No hay estudiantes aún.</p>}
    <ul>
      {students.map((s) => (
        <li key={s._id}>
          <strong>{s.name}</strong> ({s.age}) — {s.email}
          <button onClick={() => onEdit(s)}>✏️</button>
          <button onClick={() => onDelete(s._id)}>🗑️</button>
        </li>
      ))}
    </ul>
  </div>
);

export default StudentList;
