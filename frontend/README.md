🧪 Ejemplos para probar con Postman
1️⃣ Crear curso

POST http://localhost:4000/api/courses

{
  "title": "Programación con Node.js",
  "teacher": "Ema Tevez",
  "hours": 20
}

2️⃣ Crear estudiante con curso asignado

POST http://localhost:4000/api/students

{
  "name": "Ana Gómez",
  "email": "ana@example.com",
  "age": 22,
  "enrolledCourses": ["ID_DEL_CURSO"]
}

3️⃣ Pipeline de ejemplo

POST http://localhost:4000/api/students/aggregate

{
  "pipeline": [
    { "$match": { "age": { "$gte": 18 } } },
    { "$group": { "_id": null, "promedioEdad": { "$avg": "$age" }, "total": { "$sum": 1 } } }
  ]
}
