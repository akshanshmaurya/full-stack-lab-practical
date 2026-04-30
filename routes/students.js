const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

/*
  GET /api/students
  Fetch all students from DB
*/
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*
  GET /api/students/:id
  Fetch single student using MongoDB _id
*/
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

/*
  PUT /api/students/:id
  Update student completely
*/
router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*
  DELETE /api/students/:id
  Remove student from DB
*/
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

module.exports = router;
