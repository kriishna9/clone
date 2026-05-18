const sendMail = require(
  "../utils/sendMail"
);

const Application = require(
  "../models/Application"
);

const applyToCompany =
  async (req, res) => {
    try {
      const {
        studentId,
        companyId,
      } = req.body;

      const existing =
        await Application.findOne(
          {
            student:
              studentId,

            company:
              companyId,
          }
        );

      if (existing) {
        return res
          .status(400)
          .json({
            message:
              "Already Applied",
          });
      }

      const application =
        await Application.create(
          {
            student:
              studentId,

            company:
              companyId,
          }
        );

      res.json(
        application
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find(
          {
            student:
              req.params.id,
          }
        ).populate(
          "company"
        );

      res.json(
        applications
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getAllApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find()
          .populate(
            "student"
          )
          .populate(
            "company"
          );

      res.json(
        applications
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const updateStatus =
  async (req, res) => {
    try {
      const application =
        await Application.findByIdAndUpdate(
          req.params.id,

          {
            status:
              req.body.status,
          },

          {
            new: true,
          }
        );

      const populated =
        await application.populate(
          "student company"
        );

      await sendMail(
        populated.student.email,

        `Application ${req.body.status}`,

        `Hello ${populated.student.name},

Your application for ${populated.company.companyName} has been ${req.body.status}.

Role: ${populated.company.role}

Best wishes for your placement journey.`
      );

      res.json(
        application
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getStats =
  async (req, res) => {
    try {
      const total =
        await Application.countDocuments();

      const approved =
        await Application.countDocuments(
          {
            status:
              "approved",
          }
        );

      const rejected =
        await Application.countDocuments(
          {
            status:
              "rejected",
          }
        );

      const pending =
        await Application.countDocuments(
          {
            status:
              "pending",
          }
        );

      const percentage =
        total > 0
          ? (
              (approved /
                total) *
              100
            ).toFixed(2)
          : 0;

      res.json({
        total,
        approved,
        rejected,
        pending,
        percentage,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  applyToCompany,

  getApplications,

  getAllApplications,

  updateStatus,

  getStats,
};