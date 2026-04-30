const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/*
  MIDDLEWARE
*/
app.use(cors());

// Parse JSON body (for API requests)
app.use(express.json());

// Parse form data (for EJS forms)
app.use(express.urlencoded({ extended: true }));

/*
  EJS SETUP
*/

// Set EJS as view engine
app.set("view engine", "ejs");

// Set folder for views
app.set("views", path.join(__dirname, "views"));

/*
  DATABASE CONNECTION (LOCAL)
*/
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/*
  ROUTES
*/

// API routes
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

// Import model for EJS rendering
const Student = require("./models/Student");

/*
  VIEW ROUTES (EJS)
*/

// Home page -> show all students
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

// Add student via form
app.post("/add", async (req, res) => {
  await Student.create(req.body);
  res.redirect("/");
});

// Delete student via form
app.post("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

/*
  START SERVER
*/
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
