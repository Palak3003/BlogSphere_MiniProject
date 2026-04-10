const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// 👇 THIS MUST BE HERE
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = 5000;
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "You accessed protected route",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDUzOTA2NGM1Yjc3NDYyOTU4ODA0ZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc1NTgyMDE2LCJleHAiOjE3NzU2Njg0MTZ9.-5Z7BYYGCV128RivLZzU0tqy4JLQEsItzYI6X-AHsOM