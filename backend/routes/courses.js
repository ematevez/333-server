const express = require("express");
const { body, validationResult } = require("express-validator");
const Course = require("../models/Course");
const router = express.Router();

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ✅ Listar cursos
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  })
);

// ✅ Obtener curso por ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Curso no encontrado" });
    res.json(course);
  })
);

// ✅ Crear curso
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("El título es obligatorio"),
    body("teacher").notEmpty().withMessage("El docente es obligatorio"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  })
);

// ✅ Actualizar curso
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Curso no encontrado" });
    res.json(updated);
  })
);

// ✅ Eliminar curso
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Curso no encontrado" });
    res.json({ message: "Curso eliminado correctamente" });
  })
);

router.use((err, req, res, next) => {
  console.error("🔥 Error en /api/courses:", err.message);
  res.status(500).json({ error: err.message });
});

module.exports = router;
