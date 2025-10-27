// seed.js — Carga inicial de datos para MongoDB

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");
const Course = require("./models/Course");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  const coursesCount = await Course.countDocuments();
  const studentsCount = await Student.countDocuments();

  if (coursesCount > 0 || studentsCount > 0) {
    console.log("⚠️ La base de datos ya tiene datos. No se crearán nuevos registros.");
    return mongoose.disconnect();
  }

  console.log("🌱 Insertando datos de ejemplo...");

  const courses = await Course.insertMany([
    { title: "Programación con Node.js", teacher: "Thiago Tevez", hours: 25 },
    { title: "Bases de Datos con MongoDB", teacher: "Lucía Pérez", hours: 30 },
    { title: "Frontend con React", teacher: "Juan Rodríguez", hours: 20 }
  ]);

  const students = await Student.insertMany([
    {
      name: "Ana Gómez",
      email: "ana@example.com",
      age: 21,
      enrolledCourses: [courses[0]._id, courses[1]._id]
    },
    {
      name: "Carlos Díaz",
      email: "carlos@example.com",
      age: 24,
      enrolledCourses: [courses[1]._id]
    },
    {
      name: "Laura Fernández",
      email: "laura@example.com",
      age: 22,
      enrolledCourses: [courses[0]._id, courses[2]._id]
    }
  ]);

  console.log(`✅ Insertados ${courses.length} cursos y ${students.length} estudiantes.`);
  mongoose.disconnect();
};

seedData();
