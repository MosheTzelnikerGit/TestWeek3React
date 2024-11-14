import mongoose, { Schema, Document } from 'mongoose';
interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  region?: string;
  resources: { name: string; amount: number }[];
  
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organization: { type: String, required: true },
    region: { type: String },
    resources: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ]
  },
);


const User = mongoose.model<IUser>('User', UserSchema);

export default User;
