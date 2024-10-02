# Course Selling Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Middleware](#middleware)
- [Database](#database)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview
This project is a Course Selling Application built using the MERN stack (MongoDB, Express, React, Node.js). It provides functionalities for users to sign up, log in, purchase courses, and view their purchased courses. Admins can manage courses, including creating, deleting, and adding content.

## Features
- User authentication (login, signup)
- Admin authentication (login, signup)
- Course management (create, delete, view)
- Purchase courses
- View all courses
- View purchased courses
- Middleware for user and admin authentication
- Basic structure for the frontend

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: dotenv

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/course-selling-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd course-selling-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URL=your_mongodb_connection_string
   PORT=your_port_number
   JWT_SECRET=your_jwt_secret
   ```

## Usage
1. Start the server:
   ```bash
   node index.js
   ```
2. The server will run on the specified port (default: `3000`).

## Routes
### User Routes
- **POST** `/user/signup`: User registration
- **POST** `/user/login`: User login
- **POST** `/user/purchase`: Purchase a course
- **GET** `/user/courses`: Get all available courses
- **GET** `/user/purchased-courses`: View purchased courses

### Admin Routes
- **POST** `/admin/signup`: Admin registration
- **POST** `/admin/login`: Admin login
- **POST** `/admin/create-course`: Create a new course
- **DELETE** `/admin/delete-course/:courseId`: Delete a course
- **PUT** `/admin/add-course-content/:courseId`: Add content to an existing course

## Middleware
- **User Auth Middleware**: Verifies user tokens for protected routes.
- **Admin Auth Middleware**: Verifies admin tokens for protected routes.

## Database
The application uses MongoDB as the database, and Mongoose for object data modeling (ODM). The database connection is established using the connection string stored in the `.env` file.

## Future Enhancements
- Implement cookies for authentication instead of JWT.
- Add rate-limiting middleware to protect against brute force attacks.
- Develop a frontend using EJS (low priority).
- Develop a full-fledged frontend using React.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
