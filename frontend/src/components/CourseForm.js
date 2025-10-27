import { useState, useEffect } from "react";

const CourseForm = ({ onSave, selected, clearSelection }) => {
  const [form, setForm] = useState({ title: "", teacher: "", hours: "" });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (!form.title || !form.teacher) {
      setErrors(["Título y profesor son obligatorios"]);
      return;
    }

    onSave(form);
    setForm({ title: "", teacher: "", hours: "" });
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selected ? "Editar Curso" : "Agregar Curso"}</h2>
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
      <input
        name="title"
        placeholder="Título del curso"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="teacher"
        placeholder="Profesor"
        value={form.teacher}
        onChange={handleChange}
      />
      <input
        name="hours"
        placeholder="Horas"
        type="number"
        value={form.hours}
        onChange={handleChange}
      />
      <button type="submit">{selected ? "Actualizar" : "Agregar"}</button>
      {selected && (
        <button type="button" onClick={clearSelection}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default CourseForm;
