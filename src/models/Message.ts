import mongoose, { Document, Model, Schema } from 'mongoose';

export interface MessageDocument extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    content: string;
    attachments?: string[]; // Array of strings for multiple attachments
    createdAt?: Date;
    updatedAt?: Date;
}

const messageSchema = new Schema<MessageDocument>(
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      attachments: [String], // Array of strings for attachments
      createdAt: { type: Date, default: Date.now },   
      updatedAt: { type: Date },

     },
  );
  
  const Message: Model<MessageDocument> = mongoose.model('Message', messageSchema);
  
  export default Message;