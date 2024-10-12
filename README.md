# **Clone-X API**

This is the backend API for Clone-X, a Twitter-like application that allows users to create accounts, log in, post tweets, follow users, and manage followers and following lists. The API is built using Express.js and MongoDB for data storage, with JWT used for authentication.
## Table of Contents
-  Project Description
-  Features
-  Technologies Used
-  Prerequisites
-  Installation
-  Environment Variables
-  Running the API
-  Endpoints
-  License
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
   JWT_SECRET=your_jwt_secret
   SALT_ROUNDS=10
   APP_PORT=3000
Replace your_username and your_password with your actual MongoDB credentials.
Replace your_jwt_secret with a secret string used for JWT authentication.

## Running the API
To start the server, run: npm start
The API will be accessible at http://localhost:3000.

## Endpoints
Authentication
-  POST /register: Register a new user with full name, username, email, and password.
-  POST /login: Log in with the username and password.
  
## Tweets
-  GET /tweets: Get all tweets from users followed by the logged-in user.
-  POST /tweets: Create a new tweet (max 280 characters).
-  PUT /tweets/:id: Edit an existing tweet.
-  DELETE /tweets/:id: Delete a tweet.
  
## Followers
-  GET /followers: Get the list of followers of the logged-in user.
-  GET /following: Get the list of users the logged-in user is following.
-  POST /follow/:id: Follow another user.
-  DELETE /unfollow/:id: Unfollow another user.
  
## User Management
-  GET /users: List all users, paginated.
-  GET /users/:id: View a user's profile and tweets
 
