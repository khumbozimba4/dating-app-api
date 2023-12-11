import mongoose, { Document, Schema } from 'mongoose';

// Define the Notification interface
export interface NotificationDocument extends Document {
  senderId: string;
  receiverId: string;
  type: string;
  content: string;
  timestamp: Date;
  read: boolean;
  link: string;
  action: string;
  status: string;
}

// Define the Notification schema
const notificationSchema = new Schema<NotificationDocument>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  read: { type: Boolean, default: false },
  link: { type: String },
  action: { type: String },
  status: { type: String },
});

// Create and export the Notification model
const Notification = mongoose.model<NotificationDocument>('Notification', notificationSchema);

export default Notification;