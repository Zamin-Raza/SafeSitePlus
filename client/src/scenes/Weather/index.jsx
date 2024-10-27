import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null); // Initialize as null for loading state

  // Fetch weather data from the backend
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/weather/getAllWeatherData');
        setWeatherData(response.data); // Assuming response.data is the object
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <Typography variant="h6">Loading weather data...</Typography>;
  }

  // Prepare data for visualization
  const temperatureData = [
    {
      time: weatherData.location.localtime, // Use the localtime for the x-axis
      temperature: weatherData.current.temp_f, // Temperature in Fahrenheit
    },
  ];

  const humidityData = [
    {
      time: weatherData.location.localtime, // Use the localtime for the x-axis
      humidity: weatherData.current.humidity, // Humidity percentage
    },
  ];

  return (
    <div className="container mt-4">
      <Typography variant="h4" gutterBottom>
        Weather Dashboard
      </Typography>

      {/* Display some key weather data in cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Current Temperature
              </Typography>
              <Typography variant="h4">
                {`${weatherData.current.temp_c}°C`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Humidity
              </Typography>
              <Typography variant="h4">
                {`${weatherData.current.humidity}%`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more cards for other data like wind speed, pressure, etc. */}
      </Grid>

      {/* Line Chart for Temperature over Time */}
      <Typography variant="h5" gutterBottom className="mt-4">
        Temperature Trend
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={temperatureData}>
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      {/* Line Chart for Humidity over Time */}
      <Typography variant="h5" gutterBottom className="mt-4">
        Humidity Trend
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={humidityData}>
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
