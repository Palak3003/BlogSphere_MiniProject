const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDUzOTA2NGM1Yjc3NDYyOTU4ODA0ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTU4Mzk4NiwiZXhwIjoxNzc1NjcwMzg2fQ.2A3QX50Y9b0VOpBEKhPKB8XEWddW6ZdSm6mgwy3zgNQ