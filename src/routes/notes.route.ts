import express from 'express';
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from '../controllers/notes.controller';

// Create a new Express router
const router = express.Router();

// Define routes and their corresponding controller functions

// Route for creating a new note
router.post('/createNote', createNote);

// Route for getting all notes
router.get('/', getNotes);

// Route for getting a single note by its ID
router.get('/:id', getNoteById);

// Route for updating a note by its ID
router.put('/:id', updateNote);

// Route for deleting a note by its ID
router.delete('/:id', deleteNote);

// Export the router for use in other parts of the application
export default router;
