import express from "express";
import {
updateAnomalyResponse , deleteAlertAndResponse
} from "../controllers/Incidents.js";

const router = express.Router();
router.post("/Updateresponse/:id" , updateAnomalyResponse)
router.post("/spam/:id" , deleteAlertAndResponse)

export default router;

