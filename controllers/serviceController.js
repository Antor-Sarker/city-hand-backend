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
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "services data not found!" });
  }
};
