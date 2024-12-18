# MongoDB Demo Project

## About the Project
This project is a basic demonstration of how to store data using MongoDB Atlas and how to use MongoDB Compass locally. It provides a simple API for managing employee data, showcasing the capabilities of MongoDB for data storage and retrieval. 

The application allows users to perform CRUD (Create, Read, Update, Delete) operations on employee records, making it a practical example for learning how to interact with a MongoDB database using Node.js and Express.

## Prerequisites
Before running this project, ensure you have the following installed:
- **MongoDB Atlas**: Set up a cluster on MongoDB Atlas to store your data. Follow the [MongoDB Atlas documentation](https://docs.atlas.mongodb.com/getting-started/) for setup instructions.
- **MongoDB Compass** (optional): A GUI for MongoDB that allows you to visualize and manage your data locally.
- **Node.js**: JavaScript runtime for executing server-side code. Download it from [Node.js official website](https://nodejs.org/).
- **Express.js**: Web framework for Node.js to build APIs.
- **dotenv**: A module to load environment variables from a `.env` file.

### Dependencies
Make sure to install the following dependencies:
```bash
npm install express mongoose dotenv
```

## Installation Instructions
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd mongo-db-demo
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   ```

## Running the Server
Once you have set up your environment and installed the necessary dependencies, you can start the server using the following command:
```bash
node server1.js
```
This will start the server on `http://localhost:3000`.

## Usage Instructions
- **GET /employees**: Retrieve a list of all employees.
- **POST /employees**: Add a new employee. Send a JSON body with employee details.
- **PUT /employees/:id**: Update an existing employee by ID. Send a JSON body with updated details.
- **DELETE /employees/:id**: Delete an employee by ID.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Note
There are still many advancements and improvements that can be made to this project, such as adding authentication, improving error handling, and implementing more complex data relationships. Feel free to explore and enhance the project as needed!

## About the Project
This project is a basic demonstration of how to store data using MongoDB Atlas and how to use MongoDB Compass locally. It provides a simple API for managing employee data, showcasing the capabilities of MongoDB for data storage and retrieval. 

To connect to your MongoDB Atlas cluster, ensure that you have the correct connection string in your `.env` file. This allows the application to communicate with your database securely.

