const mongoose =
  require("mongoose");

const experienceSchema =
  new mongoose.Schema(
    {
      student: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      companyName: {
        type: String,
      },

      role: {
        type: String,
      },

      experience: {
        type: String,
      },

      tips: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Experience",
    experienceSchema
  );