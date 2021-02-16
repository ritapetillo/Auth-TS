import mongoose from "mongoose";
import bcypt from "bcryptjs";
const schema = mongoose.Schema;

export interface UserInterface extends mongoose.Document {
  email?: string;
  password: string;
  name?: string;
  lastName?: string;
  comparePassword(password: string): boolean;
}

const UserSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

UserSchema.pre<UserInterface>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt: string = await bcypt.genSalt();
  this.password = await bcypt.hash(this.password, salt);
});

UserSchema.method("comparePassword", async function (password) {
  const user: any = this;
  const isValid = await bcypt.compare(password, user.password);
  if (isValid) return true;
  return false;
});

UserSchema.methods.toJSON = function () {
  const user: any = this.toObject();
  const { password, ...rest } = user;
  return { ...rest };
};
export default mongoose.model<UserInterface>("users", UserSchema);
