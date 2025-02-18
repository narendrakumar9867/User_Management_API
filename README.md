# Project Setup Guide

## Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system.

## Step 1: Initialize the Project
Run the following command to create a `package.json` file:
```sh
npm init -y
```

## Step 2: Install Core Dependencies
Install the necessary dependencies:
```sh
npm install express mongoose nodemon
```

## Step 3: Project Structure
Set up the following directory and file structure in the root directory:

### Folders:
```
/controllers
/middlewares
/models
/routes
/services
```

### Files:
```
.env
connection.js
index.js
index.test.js
README.md
```

## Step 4: Install Additional Dependencies
Run the following command to install additional dependencies:
```sh
npm install bcrypt cookie-parser dotenv express jsonwebtoken mongoose nodemon
```

## Step 5: Running the Project
To start the server in development mode using `nodemon`, add the following script in `package.json`:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Run the server:
```sh
npm run dev
```

## Environment Variables
Create a .env file in the root directory and configure the required environment variables as shown below:
```
MONGO_URL=mongodb://127.0.0.1:27017/your_database_name
PORT=your_port_number
JWT_SECRET=your_secret_key
```

## Conclusion
Your project is now set up and ready for development.



