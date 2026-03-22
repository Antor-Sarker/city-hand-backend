const { default: mongoose, Schema } = require("mongoose");

const bookingSchema = new Schema(
  { 
    userId: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    plan: { type: String, required: true },
    price: { type: Number, required: true },
    bookingDate: { type: String, required: true },
    bookingTime: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
