import mongoose, { Schema, Document } from 'mongoose';

export interface SubscriptionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  plan: string;
  startDate: Date;
  endDate: Date;
}

const subscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Subscription = mongoose.model<SubscriptionDocument>('Subscription', subscriptionSchema);

export default Subscription;
