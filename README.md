# Company System Fullstack
## Introduction:
- Welcome for our company project! This is a web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on company data, including employee and department information. The application also features user authentication and authorization using Spring Security.
- The system has separate roles for admins and users, with different levels of access and permissions. The frontend of the application is built using ReactJS and NextJS, providing a modern and responsive user interface. The backend is built using Java and Spring, with a MySQL database for storing and retrieving data.
- This README will provide you with all the information you need to get started with the project, including instructions for installation, configuration, and usage. We hope you find this application useful and easy to use for your company's data management needs.

## Features:
1. CRUD operations: The application allows users to perform CRUD operations on company data, including employee and department information.
2. User authentication: The application features user authentication and authorization using Spring Security, with separate roles for admins and users.
3. Responsive UI: The frontend of the application is built using ReactJS, providing a modern and responsive user interface.
4. Java and Spring: The backend of the application is built using Java and Spring, providing a robust and scalable foundation for the application.
5. MySQL: The application uses MySQL as its database for storing and retrieving data.
6. Error handling: The application includes error handling to ensure that users receive helpful error messages if something goes wrong.
7. Security: The application includes security measures to protect user data and prevent unauthorized access.
8. Easy to use: The application is designed to be easy to use, with a simple and intuitive user interface.

# API Endpoints:
- The following are the API endpoints available in the application:
## Employee Endpoints:
- GET /api/employees/get-all: Get all employees
- POST /api/employees/add: Add new employee
- GET /api/employees/get/{id}: Get one employee by ID
- PUT /api/employees/edit/{id}: Update employee by ID
- DELETE  /api/employees/delete/{id}: Delete employee by ID

## Department Endpoints:
- GET /api/department: Get all departments
- GET /api/department/get/{id}: Get a department by ID
- POST /api/department/add: Create a new department
- PUT /api/department/edit/{id}: Update a department by ID
- DELETE /api/department/delete/{id}: Delete a department by ID

## Authentication Endpoints: 
- POST /api/v2/auth/authenticate: Create and get a JWT token
- POST: /api/v2/auth/register: Create a new user
- GET /api/v2/auth/user: Get User or Admin

# Technologies:
1. Java 17: Java is the primary programming language used in the backend of the application.
2. Spring: Spring is a popular Java framework used for developing enterprise-level applications. We are using various Spring modules in our project, including Spring Boot, Spring MVC, and Spring Security.
3. MySQL: MySQL is an open-source relational database management system used for storing and retrieving data in our application.
4. ReactJS: ReactJS is a popular JavaScript library used for building modern and responsive user interfaces in our application.
5. Spring Security: Spring Security is a powerful and flexible framework used for user authentication and authorization in our application.
6. JSON Web Tokens (JWT): JWT is a standard for securely transmitting information between parties as a JSON object. We are using JWT for secure authentication in our application.
7. Maven: Maven is a build automation tool used for managing dependencies and building the project.

## Tools:
- java 17
- Nextjs
- MySQL
- mvn 3.1.0

## Dependency:
- Spring Web
- Spring Security
- Spring Data JPA
- Spring Data JDBC
- MySQL Driver
- Lombok
