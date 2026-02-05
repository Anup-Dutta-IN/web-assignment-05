import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },

    imageUrl: {
      type: String,
      required: false,
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
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", postSchema);

export default Post;
