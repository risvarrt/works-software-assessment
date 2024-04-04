import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NoteModel } from '../models/notes.model';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/notes.controller';

require('dotenv').config();

const MONGO_URI_TEST = process.env.MONGO_URI_TEST;

if (!MONGO_URI_TEST) {
  throw new Error('Missing test MONGO_URI environment variable!');
}

describe('Notes Controller', () => {
  // Before each test, establish connection to the test MongoDB database
  beforeEach(async () => await mongoose.connect(MONGO_URI_TEST));

  // After each test, close the connection to the test MongoDB database
  afterEach(async () => {
    await mongoose.connection.close();
  });

  // Test case for creating a new note
  test('creates a new note', async () => {
    // Define data for the new note
    const newNote = {
      title: 'Test Note',
      content: 'This is a test note for the API',
    };

    // Mock request object with the new note data
    const req: Request = { body: newNote } as unknown as Request;
    // Mock response object
    const res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    // Call the createNote controller function
    await createNote(req, res);

    // Assert that the response is JSON and the new note is created in the database
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    const createdNote = await NoteModel.findOne({ title: newNote.title });
    expect(createdNote).not.toBeNull();
  });

  // Test case for getting all notes
  test('gets all notes', async () => {
    // Insert some test notes into the database
    await NoteModel.create([
      { title: 'Note 1', content: 'Content 1' },
      { title: 'Note 2', content: 'Content 2' },
    ]);

    // Mock request object
    const req: Request = {} as Request;
    // Mock response object
    const res: Response = {
      json: jest.fn(),
    } as unknown as Response;
    // Call the getNotes controller function
    await getNotes(req, res);

    // Assert that the response is JSON
    expect(res.json).toHaveBeenCalled();
  });

  // Test case for getting a single note by its ID
  test('gets a single note by ID', async () => {
    // Insert a test note into the database
    const note = await NoteModel.create({
      title: 'Test Note',
      content: 'This is a test note for the API',
    });

    // Mock request object with the note ID
    const req: Request = { params: { id: note._id } } as unknown as Request;
    // Mock response object
    const res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    // Call the getNoteById controller function
    await getNoteById(req, res);

    // Assert that the response is JSON
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  // Test case for updating a note by its ID
  test('updates a note by ID', async () => {
    // Insert a test note into the database
    const note = await NoteModel.create({
      title: 'Test Note',
      content: 'This is a test note for the API',
    });

    // Define the updated title for the note
    const updatedTitle = 'Updated Test Note';
    // Mock request object with the updated title
    const req: Request = {
      params: { id: note._id },
      body: { title: updatedTitle },
    } as unknown as Request;
    // Mock response object
    const res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    // Call the updateNote controller function
    await updateNote(req, res);

    // Assert that the note is updated in the database
    const updatedNote = await NoteModel.findById(note._id);
    expect(updatedNote?.title).toBe(updatedTitle);
  });

  // Test case for deleting a note by its ID
  test('deletes a note by ID', async () => {
    // Insert a test note into the database
    const note = await NoteModel.create({
      title: 'Test Note',
      content: 'This is a test note for the API',
    });

    // Mock request object with the note ID
    const req: Request = { params: { id: note._id } } as unknown as Request;
    // Mock response object
    const res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    // Call the deleteNote controller function
    await deleteNote(req, res);

    // Assert that the note is deleted from the database
    const deletedNote = await NoteModel.findById(note._id);
    expect(deletedNote).toBeNull();
  });
});
