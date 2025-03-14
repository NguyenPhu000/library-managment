import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/webRoutes";
import connectDB from "./config/connectDB";
import sessionConfig from "./config/sessionConfig";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
// Connect frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect to the database
connectDB();

// Config Session
sessionConfig(app);

// Configure view engine
viewEngine(app);

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
