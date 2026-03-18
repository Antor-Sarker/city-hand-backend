const Services = require("../models/service.js");

exports.getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "services data not found!" });
  }
};
