import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilPicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Ffr%2Fillustrations%2Fsearch%2Fphoto%2520de%2520profil%2F&psig=AOvVaw3O2ACPKDUmUeMusKdUpAPW&ust=1730992906828000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjazaiByIkDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
