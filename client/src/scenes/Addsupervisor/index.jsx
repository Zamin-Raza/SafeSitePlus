import { useState } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Addsupervisor = () => {
  const theme = useTheme();

  // State variables for the form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    siteAssigned: "",
    phone: "",
    alternateContact: "",
    alternateEmail: "",
    status: "active",
    
  });

  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form handler (to integrate with API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.name || !formData.email || !formData.password || !formData.siteAssigned || !formData.alternateEmail) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Send a POST request to the backend API to create a new supervisor
      // Replace the API URL with your actual endpoint
      const response = await fetch('http://localhost:5000/supervisor/Register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Supervisor added successfully");
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          password: "",
          siteAssigned: "",
          phone: "",
          alternateContact: "",
          alternateEmail: "",
          status: "active",
        });
      } else {
        alert(result.message || "Error adding supervisor");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Error adding supervisor");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <h2>Add Supervisor</h2>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="1rem" width="400px">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Assigned Site"
            name="siteAssigned"
            value={formData.siteAssigned}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            label="Alternate Contact"
            name="alternateContact"
            value={formData.alternateContact}
            onChange={handleInputChange}
          />
          <TextField
            label="Alternate Email"
            name="alternateEmail"
            type="email"
            value={formData.alternateEmail}
            onChange={handleInputChange}
            required
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </TextField>

          {error && <Box color="red">{error}</Box>}

          <Button type="submit" variant="contained" color="primary">
            Add Supervisor
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Addsupervisor;
