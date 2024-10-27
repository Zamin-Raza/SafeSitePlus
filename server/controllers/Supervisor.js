import Supervisor from "../models/Supervisor.js"; 
import bcrypt from "bcryptjs";




// Add (create) a new supervisor
export const addSupervisor = async (req, res) => {
  console.log("yes we are going to add supervisor");
  try {
    const { name, email, password, phone ,  alternateContact , siteAssigned , alternateEmail , registeredBy} = req.body;

    // Check if the email is already in use
    const existingSupervisor = await Supervisor.findOne({ email });
    if (existingSupervisor) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new supervisor with hashed password
    const newSupervisor = new Supervisor({
      name,
      email,
      password: hashedPassword, // Store hashed password
      alternateEmail: alternateEmail || "zaminraza095@gmail.com", 
      alternateContact : alternateContact || "03367231826", // Default role if not provided
      registeredBy : registeredBy ,
      phone : phone ,
      siteAssigned : siteAssigned 
    });

    // Save the new supervisor to the database
    const savedSupervisor = await newSupervisor.save();

    res.status(201).json(savedSupervisor); // Respond with the newly created supervisor
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing supervisor
export const updateSupervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone ,  alternateContact , siteAssigned , alternateEmail , registeredBy} = req.body;

    // Find the existing supervisor by ID
    let supervisor = await Supervisor.findById(id);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // Hash the password if it's being updated
    let updatedFields = { name, email, phone , alternateContact , siteAssigned , alternateEmail  }; // Fields to update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt); // Hash the new password
    }

    // Update the supervisor
    supervisor = await Supervisor.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json(supervisor); // Respond with the updated supervisor
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await Supervisor.find(); // Fetch all supervisors

    if(supervisors){
        res.status(200).json(supervisors); // Return as JSON response
    }
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific supervisor by ID
export const getSupervisorById = async (req, res) => {
  try {
    const { id } = req.params;
    const supervisor = await Supervisor.findById(id); // Fetch supervisor by ID
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json(supervisor); // Return the specific supervisor
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Delete a supervisor by ID
export const deleteSupervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSupervisor = await Supervisor.findByIdAndDelete(id); // Delete supervisor by ID
    if (!deletedSupervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json({ message: "Supervisor deleted successfully" }); // Confirm deletion
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




