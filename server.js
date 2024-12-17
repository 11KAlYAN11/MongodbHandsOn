// Import required modules
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
