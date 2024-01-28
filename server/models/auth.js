import mongoose from "mongoose";

const loginInformationSchema = new mongoose.Schema({
  browser: { type: String },
  os: [
    {
      name: { type: String },
      version: { type: String },
    },
  ],
  device: { type: String },
  ip: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  loginInformation: [loginInformationSchema],
});

export default mongoose.model("User", userSchema);
