import { Schema, model, models } from "mongoose";

/* Social Links Sub Schema */
const SocialLinksSchema = new Schema(
  {
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { _id: false }
);

const UserDataSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "admin", // must match actual model name
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    shortMessage: {
      type: String,
      default: "",
      maxlength: 160,
    },

    socialLinks: {
      type: SocialLinksSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

/* 🔥 CRITICAL FIX */
const AdminData = models.adminData || model("adminData", UserDataSchema);

export default AdminData;
