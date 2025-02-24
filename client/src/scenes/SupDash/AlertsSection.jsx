import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import alert1 from "./alert1.jpg";
import alert2 from "./alert2.jpg";
import alert3 from "./alert3.jpg";

// Sample alerts (replace with real API data)
const alerts = [
  {
    id: 1,
    title: "Unauthorized Entry Detected",
    image: alert1,
    timestamp: new Date(),
  },
  {
    id: 2,
    title: "Fire Hazard Alert",
    image: alert2,
    timestamp: new Date(),
  },
  {
    id: 3,
    title: "Equipment Malfunction",
    image: alert3,
    timestamp: new Date(),
  },
];

const AlertsSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
        bgcolor: "rgba(255, 255, 255, 0.5)", // Slightly transparent background
        backdropFilter: "blur(10px)", // Blur effect like PerformanceChart
        position: "relative",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Alerts!!
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "#D32F2F", "&:hover": { bgcolor: "#B71C1C" } }} // Red color theme
          size="small"
          onClick={() => navigate("/dashboard/supervisor/viewalerts")}
        >
          View All Alerts
        </Button>
      </Box>

      {/* Alerts Grid */}
      <Grid container spacing={2}>
        {alerts.slice(0, 3).map((alert) => (
          <Grid item xs={12} sm={4} key={alert.id}>
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: "rgba(255, 255, 255, 0.9)", // Light transparency
                backdropFilter: "blur(5px)",
              }}
            >
              <img
                src={alert.image}
                alt={alert.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  boxShadow: 3,
                  bgcolor: "rgba(255, 255, 255, 0.9)", // Light transparency
                  backdropFilter: "blur(5px)",
                  borderRadius: "0 0 8px 8px", // Smooth bottom corners
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  {alert.title}
                </Typography>
                <Typography variant="body2" color="primary">
                  {format(alert.timestamp, "MMMM dd, yyyy")}
                </Typography>
                <Typography variant="body2" color="primary">
                  {format(alert.timestamp, "hh:mm a")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlertsSection;