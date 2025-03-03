import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

// Configure view engine
viewEngine(app);

// Connect to the database
connectDB();

// Configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes init
initWebRoutes(app);
// Set the port
const port = process.env.PORT || 6549;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
