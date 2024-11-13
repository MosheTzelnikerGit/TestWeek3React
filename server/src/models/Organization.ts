import mongoose, { Schema, Document } from 'mongoose';


interface IOrganization extends Document {
  name: string;
  resources: string[]; 
  budget: number;
}


const OrganizationSchema: Schema<IOrganization> = new Schema(
  {
    name: { type: String, required: true },
    resources: { type: [String], required: true }, 
    budget: { type: Number, required: true },
  },
  {
    timestamps: true, 
  }
);

const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);

export default Organization;
