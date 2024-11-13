import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  resources: { name: string; amount: number }[];
  budget: number;
}

const OrganizationSchema: Schema<IOrganization> = new Schema({
  name: { type: String, required: true, unique: true },
  resources: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  budget: { type: Number, required: true },
});

const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);

export default Organization;

