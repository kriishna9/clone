const express = require(
  "express"
);

const router =
  express.Router();

const Experience =
  require(
    "../models/Experience"
  );

router.post(
  "/",

  async (req, res) => {
    try {
      const exp =
        await Experience.create(
          req.body
        );

      res.json(exp);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.get(
  "/",

  async (req, res) => {
    try {
      const exps =
        await Experience.find()
          .populate(
            "student"
          )
          .sort({
            createdAt:
              -1,
          });

      res.json(exps);
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