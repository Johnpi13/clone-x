# **Clone-X API**

This is the backend API for Clone-X, a Twitter-like application that allows users to create accounts, log in, post tweets, follow users, and manage followers and following lists. The API is built using Express.js and MongoDB for data storage, with JWT used for authentication.

## Course Information
 
**Course Name:** Electiva 2  
**Group Members:** 
- Jonh Alejandro Tamayo Londoño
- Deivis Herrera Cortes
- Juan Pablo Cáceres Arango

## Table of Contents
-  [Project Description](#project-description)
-  [Course Information](#course-information)
-  [Features](#features)
-  [Technologies Used](#technologies-used)
-  [Prerequisites](#prerequisites)
-  [Installation](#installation)
-  [Environment Variables](#environment-variables)
-  [Running the API](#running-the-API)
-  [Endpoints](#endpoints)
-  [Testing](#testing)


## Project Description
Clone-X is designed to emulate core functionalities of Twitter. Users can:
-  Register accounts with name validation.
-  Log in with valid credentials.
-  Create tweets limited to 280 characters.
-  Follow and unfollow other users.
-  View their own and others' tweets.
-  Manage followers and users they follow.
## Features
### User Registration:
-  Validation for full name, username, email, and password.
-  Ensures unique usernames and emails.
  
### User Login:
-  Users can log in with their registered username and password.
  
### Tweets:
-  Post tweets (up to 280 characters).
-  View a paginated feed of tweets.
-  View tweets from followed users.
  
### Follow Management:
-  Follow and unfollow users.
-  View a list of followers and followed users.
-  Track follower and following counts.
  
### Authentication:
-  Uses JWT for secure authentication.
-  Access to routes requires valid tokens.
  
## Technologies Used
-  Express.js: Node.js framework used for building APIs.
-  MongoDB: NoSQL database used for data persistence.
-  Mongoose: ODM library for MongoDB.
-  JWT (JSON Web Tokens): For secure authentication.
-  bcrypt: For hashing user passwords.
-  Swagger: For API documentation (optional).
  
## Prerequisites
Before setting up the API, ensure you have the following installed:
-  Node.js
-  MongoDB (either local or a cloud instance)
-  npm (comes with Node.js)

## Installation
-  Clone the repository: git clone https://github.com/Johnpi13/clone-x
-  Navigate to the project directory: cd clone-x-api
-  Install the dependencies: npm install
  
## Environment Variables
Create a .env file in the root directory and include the following environment variables:
-  DB_CONNECTION_STRING=mongodb+srv://your_username:your_password@cluster.mongodb.net/clone-x?retryWrites=true&w=majority
-  DB_NAME=your_name_proyect    
-  JWT_SECRET=your_jwt_secret
-  SALT_ROUNDS=10
-  APP_PORT=3000
Replace your_username and your_password with your actual MongoDB credentials.
Replace your_jwt_secret with a secret string used for JWT authentication.

## Running the API
To start the server, run: npm start
The API will be accessible at http://localhost:3000.

## Endpoints
### Authentication
-  POST /register: Register a new user with full name, username, email, and password.
-  POST /signin: Log in with the username and password.
  
### Tweets
-  GET /tweet: Get all tweets from users followed by the logged-in user.
-  POST /tweet: Create a new tweet (max 280 characters).
-  PUT /tweets/:id: Edit an existing tweet.
-  DELETE /tweets/:id: Delete a tweet.
  
### Followers
-  GET /user/followers: Get the list of followers of the logged-in user.
-  GET /user/following: Get the list of users the logged-in user is following.
-  POST /user/follow/:name: Follow another user.
-  DELETE /user/followed/:name: Unfollow another user.

## Testing
This project includes a test suite to verify the functionality of different features such as user authentication, registration, tweet management and user tracking. These tests are written in Jest, which allows unit and integration tests to be performed on controllers and services.

### Test Structure
The tests are organized into specific modules for each driver and service. The purpose of each of the included tests is described below:
- **`registerController.js`**:
  - Verifies that a user can be registered correctly.
  - Includes tests for scenarios with valid and failed data in the registry.
- **`signInController.js`**:
  - Validate the login flow.
  - Includes tests for successful authentication, invalid credentials, and user not found.
- **`tweetController.js`**:
  - Validates tweet CRUD operations: list, post, update and delete.
  - Additional tests to verify the system response when no tweets are found.
- **`userController.js`**:
  - Includes tests for the functionality of adding and removing followers.
  - Check follower count and get recent tweets from followed users.
- **`authService.js`**:
  - Verifies the generation of JWT tokens for user authentication.
- **`tweetService.js`**:
  - Simulates the response by obtaining a list of tweets.
  - Check behavior when no tweet data is available.
- **`userService.js`**:
  - Tests to get an existing user (by `userName` or `email`) and handle database error cases.
  - Verification of new user creation and error handling.

### Test Execution
To run all the tests, make sure you have Jest installed and use the following command in the terminal:
```bash
npm run tests
  

 
