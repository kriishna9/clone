const Company = require(
  "../models/Company"
);

const getCompanies =
  async (req, res) => {

    try {

      const companies =
        await Company.find();

      res.status(200).json(
        companies
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const addCompany = async (
  req,
  res
) => {

  try {

    const existingCompany =
      await Company.findOne({
        companyName:
          req.body.companyName,

        role:
          req.body.role,
      });

    if (
      existingCompany
    ) {

      return res
        .status(400)
        .json({
          message:
            "Company already exists",
        });
    }

    const company =
      await Company.create(
        req.body
      );

    res.status(201).json(
      company
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  getCompanies,
  addCompany,
};