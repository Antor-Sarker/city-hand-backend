const Booking = require("../../../models/bookingSchema");

exports.getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    if (bookings.length === 0)
      return res.status(404).json({
        success: false,
        message: "booking not found",
      });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log("getBooking: ", error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
