import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  region?: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organization: { type: String, required: true, enum: ['IDF', 'Hezbollah', 'Hamas', 'Houthis', 'IRGC'] },
    region: { type: String, enum: ['North', 'South', 'Central', 'Judea and Samaria'] },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model<IUser>('User', UserSchema);

export default User;
