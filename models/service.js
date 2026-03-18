const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  title: String,
  category: String,
  categoryLabel: String,
  price: {
    basic: Number,
    standard: Number,
    premium: Number,
  },
  description: String,
  image: String,
  serviceInclusions: [String],
});

module.exports = mongoose.model("services", servicesSchema);
