const express = require("express");
const { body, validationResult } = require("express-validator");
const Student = require("../models/Students");
const Course = require("../models/Course");

const router = express.Router();

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ✅ Listar todos los estudiantes (populate cursos)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // const students = await Student.find().populate("enrolledCourses").sort({ createdAt: -1 });
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  })
);

// ✅ Obtener estudiante por ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id).populate("enrolledCourses");
    if (!student)
      return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json(student);
  })
);

// ✅ Crear estudiante
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Debe ser un email válido"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, age, enrolledCourses } = req.body;

    const existing = await Student.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Ya existe un estudiante con ese email" });

    const newStudent = await Student.create({ name, email, age, enrolledCourses });
    res.status(201).json(newStudent);
  })
);

// ✅ Actualizar estudiante
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("enrolledCourses");
    if (!updated)
      return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json(updated);
  })
);

// ✅ Eliminar estudiante
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json({ message: "Estudiante eliminado correctamente" });
  })
);

// ✅ Endpoint para practicar AGGREGATION PIPELINE
router.post(
  "/aggregate",
  asyncHandler(async (req, res) => {
    const pipeline = req.body.pipeline;
    if (!Array.isArray(pipeline))
      return res.status(400).json({ error: "El pipeline debe ser un array" });

    const result = await Student.aggregate(pipeline);
    res.json(result);
  })
);

router.use((err, req, res, next) => {
  console.error("🔥 Error en /api/students:", err.message);
  res.status(500).json({ error: err.message });
});

module.exports = router;
