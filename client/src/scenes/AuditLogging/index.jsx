import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Grid } from '@mui/material';
// import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Search } from '@mui/icons-material';

const AuditLogging = () => {
  const [filter, setFilter] = useState('');
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterstatus, setFilterstatus] = useState('');

  const formatLogTime = (log) => {
    const date = new Date(log.time);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    return formattedDate;
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      headerClassName: 'bg-primary text-white',
      cellClassName: 'bg-light',
      sortable: true,
      renderCell: (params) => (
        <div className="d-flex align-items-center">
          <Avatar alt={params.row.userId.name} className="me-2">
            {params.row.userId.name.charAt(0)}
          </Avatar>
          <div>{params.row.userId.name}</div>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      headerClassName: 'bg-primary text-white',
      cellClassName: 'bg-light',
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      headerClassName: 'bg-primary text-white',
      cellClassName: 'bg-light',
    },
  ];

  const fetchLogged = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Logged/All');
      setDatas(response.data);
      setFilteredDatas(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogged();
  }, []);

  useEffect(() => {
    let filtered = datas;

    if (searchQuery) {
      filtered = filtered.filter((data) => {
        return data.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) || data.status.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    if (filterstatus) {
      filtered = filtered.filter((data) => data.status === filterstatus);
    }

    setFilteredDatas(filtered);
  }, [searchQuery, filterstatus, datas]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Audit Logging</Typography>

      <TextField
        label="Filter by User or Action"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <FormControl variant="outlined" size="small">
        <InputLabel sx={{ fontSize: '1rem' }}>Status</InputLabel>
        <Select
          value={filterstatus}
          onChange={(e) => setFilterstatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="FAILED">Failed</MenuItem>
          <MenuItem value="SUCCESS">Success</MenuItem>
        </Select>
      </FormControl>

      <Card>
        <CardContent>
          <Typography variant="h6">Activity Logs</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Email</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDatas.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.userId.email}</TableCell>
                  <TableCell>{log.userId.name}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>{formatLogTime(log)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Login Attempts</Typography>
              <Typography variant="body2">Monitor and track login attempts, including failed attempts.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Access Monitoring</Typography>
              <Typography variant="body2">Generate reports on user access patterns and unusual activities.</Typography>
              <Button variant="outlined" color="primary">Generate Report</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">In table form</Typography>

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={filteredDatas}
                columns={columns}
                getRowId={(row) => row._id} // Use _id as the unique identifier
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[1, 2, 3, 4, 5]}
                checkboxSelection
                disableColumnMenu
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default AuditLogging;
