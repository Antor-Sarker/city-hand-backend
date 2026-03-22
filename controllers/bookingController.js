const Booking = require("../models/bookingSchema");

exports.createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      serviceCategory,
      plan,
      price,
      bookingDate,
      bookingTime,
      phone,
      address,
      notes,
    } = req.body;

    if (
      !serviceId ||
      !serviceName ||
      !serviceCategory ||
      !plan ||
      !price ||
      !bookingDate ||
      !bookingTime ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        result: false,
        message: "all fields required",
      });
    }

    //prevent duplicate booking for the same (user + service + date)
    const duplicate = await Booking.findOne({
      userId: req.userID,
      serviceId,
      bookingDate,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "you already have a booking for this service at same date",
      });
    }

    //create new booking
    const newBooking = new Booking({
      userId: req.userID,
      serviceId,
      serviceName,
      serviceCategory,
      plan,
      price,
      bookingDate,
      bookingTime,
      phone,
      address,
      notes,
    });
    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "service booking successfully completed",
      data: savedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const userId = req.userID;
    const bookings = await Booking.find({ userId });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
