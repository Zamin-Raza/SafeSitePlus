import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem  } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditInfoForm = () => {
  const { id } = useParams();
  
  const [supervisor, setSupervisor] = useState({
    name: '',
    status: '',
    email: '', // You can add more fields as needed
  });
  const [loading, setLoading] = useState(true);

  // Fetch supervisor's info based on the ID when the component mounts
  useEffect(() => {
    const fetchSupervisorData = async () => {
      console.log(id);
      try {
        const response = await axios.get(`http://localhost:5000/supervisor/supervisors/${id}`);
        setSupervisor(response.data); // Assuming API returns data with fields like 'name' and 'status'
        setLoading(false);
      } catch (error) {
        console.error('Error fetching supervisor data:', error);
        setLoading(false);
      }
    };

    fetchSupervisorData();
  }, [id]);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupervisor((prevSupervisor) => ({
      ...prevSupervisor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a PUT request to update the supervisor's info
      const response = await axios.put(`http://localhost:5000/supervisor/edit/${id}`, supervisor);
      console.log('Supervisor updated:', response.data);
      // Add a success message or redirect after update if needed
    } catch (error) {
      console.error('Error updating supervisor:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Edit Supervisor Information</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={supervisor.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={supervisor.email}
          onChange={handleInputChange}
        />
          <TextField
            label="Phone"
            name="phone"
            variant="outlined"
          
            value={supervisor.phone}
            onChange={handleInputChange}
          />
          <TextField
            label="Alternate Contact"
            name="alternateContact"
            value={supervisor.alternateContact}
            onChange={handleInputChange}
          />

          
         {/* <TextField
            select
            label="Sites"
            name="Sites"
            value={supervisor.siteAssigned}
            onChange={handleInputChange}
              fullWidth
            margin="normal"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </TextField> */}
         


         <TextField
            select
            label="Status"
            name="status"
            value={supervisor.status}
            onChange={handleInputChange}
              fullWidth
            margin="normal"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </TextField>

        {/* Add more input fields as required */}
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditInfoForm;
