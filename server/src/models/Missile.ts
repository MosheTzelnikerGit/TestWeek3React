import mongoose, { Schema, Document } from 'mongoose';

interface IMissile extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}

const MissileSchema: Schema<IMissile> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    speed: { type: Number, required: true },
    intercepts: { type: [String], required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Missile = mongoose.model<IMissile>('Missile', MissileSchema);

export default Missile;
