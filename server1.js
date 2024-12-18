const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html and static assets from root

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  position: String,
  department: String,
  salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes

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
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
});

app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true
  });
  res.json(updatedEmployee);
});

app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.status(204).send();
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
