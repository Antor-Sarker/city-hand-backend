const { default: mongoose } = require("mongoose");
const Services = require("../models/service.js");

exports.getServices = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    //filter by category
    if (category && category !== "all") query.category = category;
    //search services
    else if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
      ];
    }

    const services = await Services.find(query);
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ error: "services data not found!" });
  }
};

exports.serviceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const service = await Services.findById(id);

    if (!service) return res.status(404).json({ message: "service not found" });
    return res.json(service);
  } catch (error) {
    return res.status(500).json({ error: "service error" });
  }
};
