// Import the express framework for building web applications
const express = require('express');

// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Create an instance of an Express application
const app = express();

// Define the port on which the server will listen for requests
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to serve static files (like index.html) from the root directory
app.use(express.static(__dirname)); // Serve index.html and static assets from root

// MongoDB Connection
// Retrieve the MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using mongoose
mongoose
  .connect(MONGO_URI) // Attempt to connect to the MongoDB database
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

// Route to get all employees
app.get('/employees', async (req, res) => {
  // Retrieve all employee records from the database
  const employees = await Employee.find();
  // Send the employee records as a JSON response
  res.json(employees);
});

// Route to create a new employee
app.post('/employees', async (req, res) => {
  // Create a new employee instance with the request body data
  const employee = new Employee(req.body);
  // Save the new employee to the database
  await employee.save();
  // Send the created employee as a JSON response with a 201 status code
  res.status(201).json(employee);
});

// Route to update an existing employee by ID
app.put('/employees/:id', async (req, res) => {
  // Extract the employee ID from the request parameters
  const { id } = req.params;
  // Find the employee by ID and update it with the request body data
  const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true // Return the updated document
  });
  // Send the updated employee as a JSON response
  res.json(updatedEmployee);
});

// Route to delete an employee by ID
app.delete('/employees/:id', async (req, res) => {
  // Extract the employee ID from the request parameters
  const { id } = req.params;
  // Find the employee by ID and delete it from the database
  await Employee.findByIdAndDelete(id);
  // Send a 204 No Content response to indicate successful deletion
  res.status(204).send();
});

// Start the server and listen for incoming requests on the defined port
app.listen(PORT, () => {
  // Log a message indicating the server is running
  console.log(`Server running on http://localhost:${PORT}`);
});