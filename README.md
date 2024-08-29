# AFSE Backend API

The AFSE Backend API is a RESTful API built with Node.js, Express, and Mongoose (MongoDB). <br/>
This guide will walk you through setting up the project, installing dependencies, configuring environment variables, and running the application. <br>
Users must try and complete their album by finding every card possible (1564 in total). <br>
All heroes are fetched via [Marvel APIs](https://developer.marvel.com/docs).

## Project Overview

The AFSE Backend API provides functionalities for:

- User authentication (registration and login)
- User profile management
- Administrative tasks (managing offers)
- Interactive API documentation via Swagger

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for creating RESTful APIs.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Swagger**: Tool for API documentation.

## Installation and Setup

To set up and run the AFSE Backend API, follow these steps:

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/driza-unimi/AFSE---Backend.git
   cd afse-backend

2. **Install Dependencies**

   Install the required Node.js packages by running:

   ```bash
   npm install

3. **Configure Environment Variables**

   Create a .env file in the root directory of the project from .env.example. Add the following environment variables:

   ```env
   .env.example
   JWT_SECRET=Iu6YWyFGC5qFqzCYujcLLvgmoy6Fns31
   MONGO_URI=mongodb://localhost:27017/myapp
   PORT=3000 # default is 3000
   MARVEL_PRIVATE_KEY=your_marvel_private_key
   MARVEL_PUBLIC_KEY=your_marvel_public_key

4. **Ensure MongoDB is Running**

Make sure that MongoDB is installed and running. If you're using a local MongoDB instance, it should be accessible at the URI specified in your .env file. If you need to set up MongoDB, follow the [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/).

5. **Seed the database**

   Seeding the database makes sure to create an Admin user, all the offers to buy credit and card packs and fetch all heroes from [Marvel APIs](https://developer.marvel.com/docs). <br/>
   The heroes fetch make take few hours.
   ```bash
   npm run seed

## Running the Application
With the setup complete, you can start the server using:
1. **Run the application in development mode**
   ```bash
   npm run dev

2. **Run the server**
   ```bash
   npm run dev

2. **Swagger**
   ```
   http://localhost:3000/api-docs
