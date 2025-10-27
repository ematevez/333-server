import { useState, useEffect } from "react";

const StudentForm = ({ onSave, selected, clearSelection }) => {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
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

  // Validaciones básicas
  if (!form.name.trim() || !form.email.trim() || !form.age) {
    setErrors(["Todos los campos son obligatorios"]);
    return;
  }

  const formattedData = {
    name: form.name.trim(),
    email: form.email.trim(),
    age: Number(form.age), // 🔥 convierte a número
  };

  console.log("📤 Enviando estudiante:", formattedData);
  onSave(formattedData);
  setForm({ name: "", email: "", age: "" });
  clearSelection();
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>{selected ? "Editar Estudiante" : "Agregar Estudiante"}</h2>

      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Edad"
        type="number"
        value={form.age}
        onChange={handleChange}
      />

      <button type="submit">{selected ? "Actualizar" : "Agregar"}</button>
      {selected && (
        <button
          type="button"
          onClick={() => {
            clearSelection();
            setForm({ name: "", email: "", age: "" });
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default StudentForm;
