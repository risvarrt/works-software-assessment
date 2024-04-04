import { Request, Response } from 'express';
import { NoteModel } from '../models/notes.model';

//Create a New Note (POST)
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a new NoteModel instance with the data from the request body
    const newNote = new NoteModel(req.body);
    // Save the new note to the database
    await newNote.save();

    res.status(201).json(newNote);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// GET all notes
export const getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      // Retrieve all notes from the database
      const notes = await NoteModel.find();
      // Respond with the array of notes
      res.json(notes);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // GET a single note by ID
  export const getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      // Find a note by its ID
      const note = await NoteModel.findById(req.params.id);
      if (!note) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        // If note is found, respond with the note object
        res.json(note);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // UPDATE a note by ID
  export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      // Find and update a note by its ID
      const updatedNote = await NoteModel.findByIdAndUpdate(
        req.params.id,
        {...req.body, updatedAt: new Date()},
        { new: true }
      );
      if (!updatedNote) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        // If note is updated successfully, respond with the updated note object
        res.json(updatedNote);
      }
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // DELETE a note by ID
  export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
      // Find and delete a note by its ID
      const deletedNote = await NoteModel.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        // If note is deleted successfully, respond with a success message
        res.json({ message: 'Note deleted successfully' });
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
