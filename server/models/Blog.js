const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },


    category: {
      type: String,
      enum: ["Travel", "Family", "Friends", "Health", "Life", "General"],
      default: "General",
    },

    // 🖼️ IMAGE
    image: {
      type: String,
      default: "https://source.unsplash.com/600x400/?nature",
    },

    // 👤 AUTHOR
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],


    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);