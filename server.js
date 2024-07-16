// server.js

import app from "./src/app.js";
import connectDB from "./src/config/database.js";

// Connect to MongoDB database
connectDB();

// Set the port for the server to listen on
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
