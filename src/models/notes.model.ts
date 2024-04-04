import mongoose from 'mongoose';

// Define the structure of a Note document
interface Note {
  folder: string;           
  title: string;         
  content: string;         
  createdAt?: Date;        
  updatedAt?: Date;         
}

// Define the schema for the Note document
const noteSchema = new mongoose.Schema<Note>({
  folder: { type: String, default: "random" },  
  title: { type: String, required: true },       
  content: { type: String, required: true },     
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: null },     
});

// Create a Mongoose model for the Note document based on the defined schema
export const NoteModel = mongoose.model<Note>('Note', noteSchema);
