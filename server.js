// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the express framework for building web applications
const express = require('express');

// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Create an instance of an Express application
const app = express();

// Define the port on which the server will listen for requests
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB Connection
// Retrieve the MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using mongoose
mongoose.connect(MONGO_URI) // Attempt to connect to the MongoDB database
  .then(() => console.log('MongoDB Connected Successfully')) // Log success message
  .catch(err => console.error('MongoDB Connection Error:', err)); // Log any connection errors

// Define the schema for the Employee model
const employeeSchema = new mongoose.Schema({
  name: String, // Employee's name
  age: Number, // Employee's age
  position: String, // Employee's job position
  department: String, // Employee's department
  salary: Number // Employee's salary
});

// Create the Employee model based on the defined schema
const Employee = mongoose.model('Employee', employeeSchema);

// Define routes for the application

// Route for the root endpoint
app.get('/', async (req, res) => {
  // Send a simple HTML response for the root endpoint
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

// Route to create a new employee
app.post('/employees', async (req, res) => {
  try {
    // Create a new employee instance with the request body data
    const newEmployee = new Employee(req.body);
    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();
    // Send the created employee as a JSON response with a 201 status code
    res.status(201).json(savedEmployee);
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(400).json({ error: err.message });
  }
});

// Route to retrieve all employees
app.get('/employees', async (req, res) => {
  try {
    // Retrieve all employee records from the database
    const employees = await Employee.find();
    // Send the employee records as a JSON response with a 200 status code
    res.status(200).json(employees);
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: err.message });
  }
});

// Route to update an existing employee by ID
app.put('/employees/:id', async (req, res) => {
  try {
    // Find the employee by ID and update it with the request body data
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Send the updated employee as a JSON response with a 200 status code
    res.status(200).json(updatedEmployee);
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(400).json({ error: err.message });
  }
});

// Route to delete an employee by ID
app.delete('/employees/:id', async (req, res) => {
  try {
    // Find the employee by ID and delete it from the database
    await Employee.findByIdAndDelete(req.params.id);
    // Send a success message as a JSON response with a 200 status code
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(400).json({ error: err.message });
  }
});

// Start the server and listen for incoming requests on the defined port
app.listen(PORT, () => {
  // Log a message indicating the server is running
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