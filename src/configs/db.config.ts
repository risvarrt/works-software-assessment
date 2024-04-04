import mongoose from 'mongoose';

// Load environment variables from the .env file
require('dotenv').config();

// Retrieve the MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Ensure the MONGO_URI is set before attempting connection
if (!MONGO_URI) {
 throw new Error('Missing MONGO_URI environment variable!');
}

// Asynchronous function to connect to the MongoDB database
export const connectDB = async () => {
 try {
   // Attempt to connect to MongoDB using the provided URI
   const connection = await mongoose.connect(MONGO_URI);

   console.log(`MongoDB connected: ${connection.connection.host}`);

   // Return the established connection object for further use
   return connection;
 } catch (err) {
   console.error(err);

   // Terminate the process with an error code
   process.exit(1);
 }
};
