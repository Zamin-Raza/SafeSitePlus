import express from "express";
import {
  getAllSupervisors,
  getSupervisorById,
  addSupervisor,
  deleteSupervisor,
  updateSupervisor,
} from "../controllers/Supervisor.js";

const router = express.Router();

router.get("/supervisors", getAllSupervisors); // Get all supervisors
router.get("/supervisors/:id", getSupervisorById); // Get a specific supervisor by ID
router.post("/Register", addSupervisor); // Create a new supervisor
router.delete("/supervisors/:id", deleteSupervisor); // Delete a supervisor by ID
router.put("/supervisors/:id", updateSupervisor); // Update a supervisor

export default router;

