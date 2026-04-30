const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  branch: String,
  marks: { type: Number, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
