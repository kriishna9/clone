const express =
  require("express");

const router =
  express.Router();

const User =
  require("../models/User");

router.get(
  "/",

  async (
    req,
    res
  ) => {

    try {

      const students =
        await User.find({

          role:
            "student",
        })

        .sort({
          cgpa: -1,
        });

      res.json(
        students
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  }
);

module.exports =
  router;