const uploadToCloudinary = require("../../../utils/uploadToCloudinary");
const service = require("../../../models/service");

exports.createService = async (req, res) => {
  try {
    //validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // upload image
    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    // create service
    const newService = await service.create({
      title: req.body.title,
      category: req.body.category,
      categoryLabel: req.body.categoryLabel,
      price: JSON.parse(req.body.price),
      status: req.body.status,
      description: req.body.description,
      serviceInclusions: JSON.parse(req.body.serviceInclusions),
      image: {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
    });

    //response
    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Service creation failed",
    });
  }
};
