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
      userId: req.user.userId,
      serviceId,
      bookingDate,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "You've already booked this service for this date.",
      });
    }

    //create new booking
    const newBooking = new Booking({
      userId: req.user.userId,
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
    console.log("service booking error: ",error)
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

exports.getSelfBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
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

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const allowFields = [
      "plan",
      "price",
      "bookingDate",
      "bookingTime",
      "phone",
      "address",
      "notes",
      "status",
    ];
    const updates = {};

    for (const field of allowFields) {
      if (req.body[field]) updates[field] = req.body[field];
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        $set: updates,
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedBooking)
      return res
        .status(404)
        .json({ success: false, message: "booking not found" });

    return res.status(200).json({
      success: 200,
      message: "booking update successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
