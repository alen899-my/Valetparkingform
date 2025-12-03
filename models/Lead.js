import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  // Step 1
  locationName: String,
  capacity: Number,
  waitTime: String,
  mapsUrl: String,
  latitude: String,
  longitude: String,
  timing: String,
  address: String,

  // Step 2
  lobbies: Number,
  keyRooms: Number,
  distance: String,
  supervisorUser: String,
  validationUser: String,
  reportUser: String,

  // Step 3
  ticketType: String,
  feeType: String,
  ticketPricing: String,
  vatType: String,

  // Step 4
  driverCount: Number,
  driverList: String,

  // Step 5
  adminName: String,
  adminEmail: String,
  adminPhone: String,
  trainingRequired: String,

  // Step 6 – Files
  attachments: [
    {
      fieldname: String,
      filename: String,
      fileId: mongoose.Schema.Types.ObjectId,
    },
  ],

  documentSubmitMethod: String,
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
