import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  const { supervisorId, title, content, priority, dueDate, isImportant } = req.body;

  try {
    const newNote = new Note({
      supervisorId,
      title,
      content,
      priority,
      dueDate,
      isImportant,
    });

    await newNote.save();

    return res.status(201).json({
      success: true,
      message: 'Note created successfully.',
      data: newNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error creating note.',
    });
  }
};


export const getAllNotes = async (req, res) => {
  const { supervisorId } = req.params;

  try {
    const notes = await Note.find({ supervisorId }).sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No notes found for this supervisor.',
      });
    }

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching notes.',
    });
  }
};



export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, priority, dueDate, isImportant } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, priority, dueDate, isImportant },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note updated successfully.',
      data: updatedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error updating note.',
    });
  }
};


export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting note.',
    });
  }
};

