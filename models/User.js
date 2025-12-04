// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
 
  phone: { type: String, required: true, trim: true, minlength: 8, maxlength: 15 },
  password: { type: String, required: true }, // hashed
  role: { type: String, default: "user" },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
