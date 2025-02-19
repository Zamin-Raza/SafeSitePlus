import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Modal, TextField, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const NotesComponent = () => {
  const [notes, setNotes] = useState([]);  // State to hold the notes
  const [open, setOpen] = useState(false);  // State to manage modal visibility
  const [newNote, setNewNote] = useState({ title: '', content: '', priority: 'Medium', dueDate: '', isImportant: false });  // State for new note form
  const supervisorId = "675c24c6d8670f67b459203c"; // Use the provided supervisorId

  // Fetch all notes for the supervisor
  const fetchAll = async () => {
    console.log("fetch notes");
    try {
      const response = await axios.get(`http://localhost:5000/Notes/notes/${supervisorId}`);
      setNotes(response.data);  // Assuming the response contains the notes array
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchAll();  // Fetch notes on component mount
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddNote = async () => {
    console.log("dasdsadsa")
    try {
      const response = await axios.post('http://localhost:5000/Note/notes', {
        supervisorId,
        title: newNote.title,
        content: newNote.content,
        priority: newNote.priority,
        dueDate: newNote.dueDate,
        isImportant: newNote.isImportant,
      });
  
      // After the note is added, update the state
      setNotes([...notes, response.data.data]);  // Assuming response.data.data contains the added note
      setNewNote({ title: '', content: '', priority: 'Medium', dueDate: '', isImportant: false });
      handleClose();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  

  const handleEdit = (id) => {
    // Handle note editing, show modal with existing content
    const noteToEdit = notes.find(note => note._id === id);
    setNewNote({
      title: noteToEdit.title,
      content: noteToEdit.content,
      priority: noteToEdit.priority,
      dueDate: noteToEdit.dueDate,
      isImportant: noteToEdit.isImportant,
    });
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      // Delete note by ID
      await axios.delete(`Note/notes/${id}`);
      const updatedNotes = notes.filter(note => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      {/* Add New Note Button */}
      <IconButton onClick={handleOpen} color="primary" style={{ marginBottom: '20px' }}>
        <Add />
      </IconButton>

      {/* Notes Grid */}
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.content}</Typography>

                {/* Action Icons */}
                <div style={{ marginTop: '10px' }}>
                  <IconButton onClick={() => handleEdit(note._id)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(note._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Adding/Editing Notes */}
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <TextField
            label="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Priority"
            value={newNote.priority}
            onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            style={{ marginBottom: '10px' }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            value={newNote.dueDate}
            onChange={(e) => setNewNote({ ...newNote, dueDate: e.target.value })}
            fullWidth
            style={{ marginBottom: '10px' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Important"
            type="checkbox"
            checked={newNote.isImportant}
            onChange={(e) => setNewNote({ ...newNote, isImportant: e.target.checked })}
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddNote}>
            {newNote._id ? 'Save Changes' : 'Add Note'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: 24,
  maxWidth: '500px',
  width: '100%',
};

export default NotesComponent;
