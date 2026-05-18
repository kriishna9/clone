const express = require(
  "express"
);

const router =
  express.Router();

const upload = require(
  "../middleware/upload"
);

const User = require(
  "../models/User"
);

router.post(
  "/resume/:id",

  upload.single(
    "resume"
  ),

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      user.resume =
        req.file.filename;

      await user.save();

      res.json({
        message:
          "Resume Uploaded",
      });

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