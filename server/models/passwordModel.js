import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Password = mongoose.model("Password", passwordSchema);

export default Password;
