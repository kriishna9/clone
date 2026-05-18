const express = require("express");

const router = express.Router();

const {
  getCompanies,
  addCompany,
} = require("../controllers/companyController");

const Application = require("../models/Application");

router.get("/", getCompanies);

router.post("/", addCompany);

router.get(
  "/leaderboard/data",

  async (req, res) => {
    try {

      const applications =
        await Application.find({
          status: "approved",
        })
          .populate("student")
          .populate("company");

      const leaderboard =
        applications.map(
          (app, index) => ({
            rank: index + 1,

            student:
              app.student?.name,

            branch:
              app.student?.branch,

            company:
              app.company?.companyName,

            role:
              app.company?.role,

            package:
              app.company?.package,
          })
        );

      res.json(leaderboard);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;