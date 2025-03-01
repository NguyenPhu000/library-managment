import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize view engine and web routes
viewEngine(app);
initWebRoutes(app);

// Connect to the database
connectDB();

// Set the port
const port = process.env.PORT || 6549;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
