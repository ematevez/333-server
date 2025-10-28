# 332-server

Guía Completa de Deploy — Proyecto 332 (Backend + Frontend)
Estructura del proyecto
333-server/         ← carpeta del backend (Node + Express + MongoDB)
333-client/         ← carpeta del frontend (React)
________________________________________
 1️ BACKEND — Deploy en Render
✅ Paso 1. Crear cuenta y proyecto
1.	Ingresá a 👉 https://render.com
2.	Logeate con tu cuenta de GitHub.
3.	Asegurate de tener tu repo del backend subido (por ejemplo https://github.com/ematevez/333-server).
4.	Clic en New → Web Service.
5.	Elegí tu repo 332-server.
________________________________________
⚙️ Paso 2. Configurar Render
•	Name: three32-server (o el nombre que quieras)
•	Region: South America (o la más cercana)
•	Branch: main (o master, según tu repo)
•	Build Command:
•	npm install
•	Start Command:
•	node server.js
•	Environment: Node
________________________________________
🔐 Paso 3. Variables de entorno (Environment Variables)
En el panel del servicio de Render, entrá a Environment → Add Environment Variable y agregá:
Variable	Valor (ejemplo)
MONGO_URI	mongodb+srv://usuario:clave@cluster0.zirxpbn.mongodb.net/332db
PORT	10000 (Render lo ignora, pero ponelo igual por compatibilidad)
________________________________________
💾 Paso 4. Revisar server.js para producción
Asegurate de que tu server.js use el puerto correcto:
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
Render asigna el puerto automáticamente desde process.env.PORT.
________________________________________
🧩 Paso 5. Conectar con MongoDB Atlas
Si aún no lo hiciste:
1.	Entrá a https://cloud.mongodb.com
2.	Crea un cluster gratuito (M0)
3.	Agregá un usuario (por ejemplo user:user)
4.	En Network Access, añadí IP 0.0.0.0/0 (acceso global)
5.	Copiá tu connection string y reemplazala en MONGO_URI.
Ejemplo:
mongodb+srv://user:user@cluster0.zirxpbn.mongodb.net/332db?retryWrites=true&w=majority
________________________________________
🚀 Paso 6. Deploy
Render detectará automáticamente el proyecto y hará build + deploy.
Si todo salió bien vas a ver:
✔ Build successful
✔ Live on https://three32-server-8sz2.onrender.com
📎 Esa URL será la base del API para el frontend.
Ejemplo:
https://three32-server-8sz2.onrender.com /api/students
https://three32-server-8sz2.onrender.com /api/courses
________________________________________
🧰 Paso 7. Verificar API
Podés probar en tu navegador o Postman:
GET https://three32-server-8sz2.onrender.com /api/students
Debería devolver un JSON vacío o con tus datos de prueba.
________________________________________
💡 Tips Render
•	Si queda “Deploying...” mucho tiempo → revisá los logs (probablemente error de conexión Mongo).
•	Si tu DB Atlas no conecta, asegurate de usar el mongodb+srv:// correcto.
•	Render apaga el servicio si no tiene tráfico (plano gratuito). Tarda unos segundos en “despertar”.
________________________________________
 2️ FRONTEND — Deploy en Netlify
✅ Paso 1. Crear cuenta
1.	Entrá a 👉 https://app.netlify.com
2.	Logeate con tu cuenta de GitHub.
________________________________________
⚙️ Paso 2. Preparar el proyecto React
Asegurate de tener la carpeta del frontend separada (332-client) con este archivo .env:
VITE_API_URL= https://three32-server-8sz2.onrender.com
⚠️ Importante: si usás Create React App (CRA), deberías llamarlo REACT_APP_API_URL en lugar de VITE_API_URL.
________________________________________
⚙️ Paso 3. Build local (para probar)
En la carpeta del frontend:
npm install
npm run build
Esto genera una carpeta /build o /dist lista para publicar.
Podés testear localmente con:
npx serve -s build
y abrir http://localhost:10000
________________________________________
🚀 Paso 4. Subir a Netlify
Tenés dos opciones:
🔹 Opción 1: Conectar tu GitHub
1.	En Netlify → Add New Site → Import an existing project
2.	Conectá tu repo 332-client
3.	Configurá:
o	Base directory: (vacío si el repo solo tiene el front)
o	Build command: npm run build
o	Publish directory: build
4.	En Environment Variables, agregá:
5.	VITE_API_URL=https://three32-server-8sz2.onrender.com
🔹 Opción 2: Subir carpeta build manualmente
1.	Desde tu proyecto local, ejecutá:
2.	npm run build
3.	En https://app.netlify.com/drop
→ Arrastrá la carpeta /build
4.	Listo 🎉 Se publicará automáticamente con una URL tipo:
5.	https://332-front.netlify.app
________________________________________
🧩 Paso 5. Verificar conexión
Abrí tu sitio Netlify.
Deberías ver el listado de estudiantes cargado desde el backend en Render.
Si no se muestra nada:
•	Revisá la consola (F12 → Console) para ver si da error de CORS.
•	Si Render devuelve error CORS, agregá en tu server.js:
•	app.use(cors({ origin: "*" }));
________________________________________
🧾 Resultado Final
Componente	URL de Ejemplo
Backend API	https://three32-server-8sz2.onrender.com

Frontend App	https://332-front.netlify.app
Endpoint ejemplo	https://three32-server-8sz2.onrender.com

________________________________________
⚡ BONUS: Testing rápido desde navegador
Abre la consola (F12) y ejecutá:
fetch("https://three32-server.onrender.com/api/students")
  .then(r => r.json())
  .then(console.log)
Deberías ver los datos cargados desde tu backend en Render 🎉
________________________________________
🧰 Errores comunes y soluciones
Error	Causa	Solución
MongoNetworkError	String de conexión incorrecto	Revisar MONGO_URI
CORS policy: No Access-Control-Allow-Origin	CORS no configurado	app.use(cors({ origin: "*" }))
Cannot GET /api/students	Ruta mal configurada o error de base URL	Revisar API_URL en frontend
Build failed en Render	Falta node_modules o dependencia	Verificar npm install o package.json
________________________________________
🧩 Recomendación para clase
Podés mostrar a tus alumnos cómo:
•	Desplegar back y front gratis
•	Conectar React con Mongo Atlas
•	Usar variables de entorno seguras
•	Ver logs en vivo en Render
•	Modificar código y ver cambios con CI/CD automático

