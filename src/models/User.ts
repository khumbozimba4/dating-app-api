import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
export interface UserDocument extends Document {
  age: any;
  religionBeliefs: any;
  footballTeams: any;
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: string;
  location: {
    coordinates: [number, number];
    city: string;
  };
  photos: string[];
  bio: string;
  interests: string[];
  preferredAgeRange: { min: number; max: number };
  preferredGender: string[];
  relationshipType: string;
  smokingHabits: string;
  drinkingHabits: string;
  education: string;
  occupation: string;
  height: number;
  bodyType: string;
  ethnicity: string;
  religion: string;
  languages: string[];
  locationPreferences: string[];
  matchingPreferences: {
    distance: number;
    ageRange: { min: number; max: number };
    interests: string[];
    gender: string[];
  };
  lastActive: Date;
  blockedUsers: string[];
  likedUsers: string[];
  matches: string[];
}

// Define User schema
const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  location: {
    coordinates: { type: [Number], default: [0, 0] },
    city: { type: String, default: '' },
  },
  photos: { type: [String], default: [] },
  bio: { type: String, default: '' },
  interests: { type: [String], default: [] },
  preferredAgeRange: {
    min: { type: Number, default: 18 },
    max: { type: Number, default: 99 },
  },
  preferredGender: { type: [String], default: [] },
  relationshipType: { type: String, default: '' },
  smokingHabits: { type: String, default: '' },
  drinkingHabits: { type: String, default: '' },
  education: { type: String, default: '' },
  occupation: { type: String, default: '' },
  height: { type: Number, default: 0 },
  bodyType: { type: String, default: '' },
  ethnicity: { type: String, default: '' },
  religion: { type: String, default: '' },
  languages: { type: [String], default: [] },
  locationPreferences: { type: [String], default: [] },
  matchingPreferences: {
    distance: { type: Number, default: 50 },
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 99 },
    },
    interests: { type: [String], default: [] },
    gender: { type: [String], default: [] },
  },
  lastActive: { type: Date, default: Date.now },
  blockedUsers: { type: [String], default: [] },
  likedUsers: { type: [String], default: [] },
  matches: { type: [String], default: [] },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
