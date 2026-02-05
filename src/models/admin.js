import { Schema, model, models } from "mongoose";

const SocialSchema = new Schema(
  {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },

    name: { type: String, required: true },

    password: { type: String, required: true },

    profileImage: {
      type: String,
      validate: {
        validator: function (value) {
          if (!value) return true;
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        },
        message: "Invalid image URL",
      },
    },

    shortMessage: {
      type: String,
      default: "",
      maxlength: 160,
    },

    socialLinks: {
      type: SocialSchema,
      default: () => ({}),
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

/* 🔥 CRITICAL FIX — USE SAME MODEL NAME */
const Admin = models.admin || model("admin", UserSchema);

export default Admin;
