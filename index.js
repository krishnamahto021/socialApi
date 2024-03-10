const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

//connect passsport jwtstrategy
const passportJwtStrategy = require("./config/passport-jwt-strategy");

const app = express();

// for parsing json
app.use(express.json());
app.use(express.urlencoded());

// to connect routes
app.use("/api/v1", require("./routes/index"));
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server is running on the port ${PORT}`));
