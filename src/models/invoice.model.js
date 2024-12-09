const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  invoiceId: {
    type: String,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "owner",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company", // Reference to the Company model
    unique: false, // Set to false to allow multiple trips for the same company
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "trip",
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
  },
  model: {
    type: String,
  },
  dayQty: {
    type: Number,
  },
  offroad: {
    type: Number,
    default: 0,
  },
  dayRate: {
    type: Number,
  },
  dayAmount: {
    type: Number,
  },
  kmQty: {
    type: Number,
  },
  kmRate: {
    type: Number,
  },
  kmAmount: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
  gstAmount: {
    type: Number,
  },
  billAmount: {
    type: Number,
  },
  from: {
    type: Date,
  },
  fromkm: Number,
  tokm: Number,
  to: {
    type: Date,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  months: [
    {
      startDate: Date,
      endDate: Date,
      startKm: Number,
      endKm: Number,
      days: Number,
      offroad: Number,
      dayAmount: Number,
      kmAmount: Number,
      totalDays: Number,
      totalKm: Number,
      totalAmount: Number,
      gstAmount: Number,
      billAmount: Number,
      invoiceDate: Date,
      district: String,
      frvCode: String,
      car: {
        type: Schema.Types.ObjectId,
        ref: "Car",
      },
      rate: {
        date: Number,
        km: Number,
      },
      rent: Number,
      companyStatus: {
        type: String,
        enum: ["paid", "pending"],
        default: "pending",
      },
      ownerStatus: {
        type: String,
        enum: ["paid", "pending"],
        default: "pending",
      },
      invId: String,
    },
  ],
  status: {
    type: String,
    enum: ["paid", "pending", "unpaid"],
    default: "unpaid",
  },
});

invoiceSchema.pre("save", function (next) {
  const invoice = this;

  // Generate unique invoiceId if not already set
  if (!invoice.invoiceId) {
    invoice.constructor
      .countDocuments()
      .then((count) => {
        invoice.invoiceId = String(count + 1).padStart(3, "0");

        // Generate invId for each month
        invoice.months.forEach((month, index) => {
          month.invId = `${invoice.invoiceId}${index + 1}`;
        });
        next();
      })
      .catch(next);
  } else {
    // If invoiceId is already set, ensure invId is set for each month
    invoice.months.forEach((month, index) => {
      if (!month.invId) {
        month.invId = `${invoice.invoiceId}${index + 1}`;
      }
    });
    next();
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
