import { Schema, model, models } from "mongoose";

const gallerySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
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
  },
  { timestamps: true }
);

// Prevent extra fields from being saved
gallerySchema.set("strict", true);

const Gallery = models.Gallery || model("Gallery", gallerySchema);

export default Gallery;
