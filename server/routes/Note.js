import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote } from '../controllers/Note.js';

const router = express.Router();

// Route to create a new note
router.post('/notes', createNote);

// Route to get all notes for a specific supervisor
router.get('/notes/:supervisorId', getAllNotes);

// Route to update an existing note
router.put('/notes/:noteId', updateNote);

// Route to delete a note
router.delete('/notes/:noteId', deleteNote);

export default router;
