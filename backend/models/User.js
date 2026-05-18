const mongoose = require(
  "mongoose"
);

const userSchema =
  new mongoose.Schema({

    /* STUDENT DETAILS */

    name: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    cgpa: {
      type: Number,
      default: 0,
    },

    backlogs: {
      type: Number,
      default: 0,
    },

    skills: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    /* RECRUITER DETAILS */

    companyName: {
      type: String,
      default: "",
    },

    hrName: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    companyType: {
      type: String,
      default: "",
    },

    /* COMMON */

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

      enum: [
        "student",
        "admin",
        "recruiter",
      ],

      default:
        "student",
    },
  });

module.exports =
  mongoose.model(
    "User",
    userSchema
  );