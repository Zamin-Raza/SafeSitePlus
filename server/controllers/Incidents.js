import AnomalyResponse from "../models/Incidents.js";

import DetectedAnomaly from "../models/detected_anomalies.js"; // Your alert model

export const deleteAlertAndResponse = async (req, res) => {
  try {
    const { id } = req.params; // Alert ID

    // Delete the response entry related to this anomaly
    await AnomalyResponse.deleteOne({ anomalyId: id });

    // Delete the detected anomaly itself
    const deletedAlert = await DetectedAnomaly.findByIdAndDelete(id);

    if (!deletedAlert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json({
      message: "Alert and related response deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting alert:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Update Response Details & Status
export const updateAnomalyResponse = async (req, res) => {
    console.log("abhi response nikal aye ga ")
  try {
    const { responseDetails, status } = req.body;
    const { id } = req.params; // AnomalyResponse ID

    // Find the response entry
    const anomalyResponse = await AnomalyResponse.findOne({ anomalyId: id });
    console.log("hn iska response change ho jaye ga" + anomalyResponse);
    if (!anomalyResponse) {
      return res.status(404).json({ message: "Anomaly response not found" });
    }

    // Calculate response time (difference between now and creation)
    if (!anomalyResponse.responseTime) {
      anomalyResponse.responseTime = new Date() - anomalyResponse._id.getTimestamp();
    }

    // Update details
    anomalyResponse.responseDetails = responseDetails || anomalyResponse.responseDetails;
    anomalyResponse.status = status || anomalyResponse.status;

    // If marked as "Resolved", set resolvedAt timestamp
    if (status === "Resolved") {
      anomalyResponse.resolvedAt = new Date();
    }

    // Save updated document
    await anomalyResponse.save();
    res.status(200).json({ message: "Anomaly response updated successfully", anomalyResponse });
  } catch (error) {
    console.error("Error updating anomaly response:", error);
    res.status(500).json({ message: "Server error" });
  }
};


