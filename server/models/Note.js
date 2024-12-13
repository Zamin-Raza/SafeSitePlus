import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the supervisor
    required: true,
  },
 
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  priority: {
    type: String,  // e.g., 'High', 'Medium', 'Low'
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  dueDate: {
    type: Date,
    required: false,
  },
  isImportant: {
    type: Boolean,
    default: false,  // Whether the note is marked as important
  },
},{ timestamps: true } );

const Note = mongoose.model('Note', noteSchema);

export default Note;
