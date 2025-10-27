const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacher: { type: String, required: true },
  hours: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", CourseSchema);
