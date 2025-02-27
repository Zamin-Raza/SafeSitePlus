import React, { useEffect, useState } from 'react';
import { Bar, Pie , Line  , Doughnut , Radar} from 'react-chartjs-2';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';
import 'chart.js/auto'; // Automatically import necessary chart types
import { useSelector } from 'react-redux';

const StatsSupervisor = () => {
  const [supervisorData, setSupervisorData] = useState({
    total: 0,
    active: 0,
    closed: 0,
    notifications:0,
    InProgress:0,
    recentActivity: [], // Data for trends (optional)
  })
 const UserId = useSelector((state) => state.global.userId);

  
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`); // Adjust your API endpoint
        const myAllSites = response.data; // Assuming the API returns an array of supervisor objects
  
        // Initialize supervisor data
        const updatedSupervisorData = {
          total: myAllSites.length,
          active: 0,
          closed: 0,
        };

        
  
        // Count active and suspended supervisors
        myAllSites.forEach((site) => {
          if (site.status === 'active') {
            updatedSupervisorData.active++;
          } else  {
            updatedSupervisorData.closed++;
          }
        });
  
        // Update state with the processed data
        setSupervisorData(updatedSupervisorData);
      } catch (error) {
        console.error('Error fetching supervisor stats:', error);
      }
    };
  
    fetchSites();
  }, []);

  
  const LineChart =  {
      labels: ['January', 'February', 'March', 'April', 'May'], // Example months, adjust according to your data
      datasets: [
        {
          label: 'Registered Supervisors',
          data: [10, 20, 30, 50, supervisorData.total], // Replace with dynamic data
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.1,
        },
      ],
    };
  
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const Radardata = {
      labels: ['Registered', 'Active', 'Suspended'],
      datasets: [
        {
          label: 'Supervisor Metrics',
          data: [
            supervisorData.registered,
            supervisorData.active,
            supervisorData.closed,
          ],
          backgroundColor: 'rgba(66, 165, 245, 0.2)', // Light fill color
          borderColor: '#42A5F5',
          pointBackgroundColor: '#1E88E5',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#1E88E5',
        },
      ],
    };


    const Doughnutdata = {
      labels: ['Active', 'Closed'],
      datasets: [
        {
          data: [
            supervisorData.active,
            supervisorData.closed,
          ],
          backgroundColor: ['#66BB6A', '#FF7043'], // Colors for each slice
          hoverBackgroundColor: ['#43A047', '#D84315'],
          borderWidth: 2,
        },
      ],
    };

  
  


  
  

  // Prepare data for Bar Chart
  const barChartData = {
    labels: ['Registered', 'Active', 'Closed'],
    datasets: [
      {
        label: 'Supervisors Count',
        data: [supervisorData.total, supervisorData.active, supervisorData.closed],
        backgroundColor: ['#3f51b5', '#4caf50', '#f44336'], // Different colors for bars
        borderColor: ['#303f9f', '#388e3c', '#d32f2f'],
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for Pie Chart
  const pieChartData = {
    labels: ['Active', 'Closed'],
    datasets: [
      {
        label: 'Supervisor Status',
        data: [supervisorData.active, supervisorData.closed],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#e57373'],
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Bar Chart for Supervisors Count */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Supervisors Count</Typography>
          <Bar data={barChartData} />
        </Grid>
        {/* Pie Chart for Supervisors Status */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Supervisors Status</Typography>
          <Pie data={pieChartData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Supervisors Status</Typography>
          <Line data={LineChart} options={options} />;
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Supervisors Status</Typography>
          <Doughnut data={Doughnutdata} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Supervisors Status</Typography>
          <Radar data={Radardata} />
        </Grid>

      </Grid>
    </Container>
  );
};

export default StatsSupervisor;
