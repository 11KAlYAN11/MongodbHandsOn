
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Schema and Model
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  position: String,
  department: String,
  salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes

// Root Endpoint
app.get('/', async (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Employee API</title>
      </head>
      <body>
        <h1>Welcome to Employee API</h1>
        <h2>You are now in the root endpoint</h2>
        <h3>Feel free to explore the <a href="/employees">/employees</a> endpoint from here!</h3>
      </body>
    </html>
  `);
});

// 1. Insert Data (Create)
app.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Retrieve Data (Read)
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Data
app.put('/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Delete Data
app.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


/* // Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string from MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI; // Add this to your .env file

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Define Mongoose schema and model for Employee
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  position: String,
  department: String
});

const Employee = mongoose.model('Employee', employeeSchema);

// API Endpoint to insert employee data
app.post('/api/employees', async (req, res) => {
  try {
    const { name, age, email, position, department } = req.body;
    const newEmployee = new Employee({ name, age, email, position, department });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully!', data: newEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// API Endpoint to fetch all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/