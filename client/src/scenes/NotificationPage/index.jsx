// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { DataGrid } from '@mui/x-data-grid';
// import { format } from 'date-fns';
// import { IconButton, Button } from '@mui/material';
// import { FiAlertCircle, FiCheckCircle, FiEye } from 'react-icons/fi';

// export default function NotificationsPage() {
// //   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedNotifications, setSelectedNotifications] = useState([]);

//   const sampleNotifications = [
//     {
//       id: '1',
//       date: new Date().toISOString(),
//       type: 'alert',
//       message: 'Server downtime scheduled for tomorrow.',
//       status: 'unread',
//     },
//     {
//       id: '2',
//       date: new Date(Date.now() - 86400000).toISOString(),
//       type: 'info',
//       message: 'Your password has been successfully changed.',
//       status: 'read',
//     },
//     {
//       id: '3',
//       date: new Date(Date.now() - 172800000).toISOString(),
//       type: 'alert',
//       message: 'Update your profile to continue using all features.',
//       status: 'unread',
//     },
//   ];

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setNotifications(sampleNotifications);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleRowClick = (params) => {
//     navigate(`/notification/${params.id}`);
//   };

//   const handleMarkAsRead = () => {
//     alert('Actions not yet implemented');
//   };

//   const columns = [
//     {
//       field: 'date',
//       headerName: 'Date',
//       flex: 1,
//       renderCell: (params) => format(new Date(params.value), 'MM/dd/yyyy'),
//     },
//     {
//       field: 'time',
//       headerName: 'Time',
//       flex: 1,
//       valueGetter: (params) => format(new Date(params.row.date), 'hh:mm a'),
//     },
//     {
//       field: 'message',
//       headerName: 'Description',
//       flex: 2,
//     },
//     {
//       field: 'type',
//       headerName: 'Type',
//       flex: 1,
//       renderCell: (params) =>
//         params.value === 'alert' ? (
//           <span>
//             <FiAlertCircle className="text-red-500 mr-2" />
//             {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
//           </span>
//         ) : (
//           <span>
//             <FiCheckCircle className="text-green-500 mr-2" />
//             {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
//           </span>
//         ),
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       flex: 1,
//       renderCell: (params) => (
//         <span
//           className={`px-3 py-1 rounded-full ${
//             params.value === 'read'
//               ? 'bg-green-100 text-green-600'
//               : 'bg-yellow-100 text-yellow-600'
//           }`}
//         >
//           {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
//         </span>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleRowClick(params.row)}>
//           <FiEye className="text-slate-600 hover:text-slate-800" />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <main className="p-5 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-6">Notifications</h1>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => alert('Actions not yet implemented')}
//           className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
//         >
//           Mark Selected as Read
//         </button>
//       </div>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={notifications}
//           columns={columns}
//           pageSize={5}
//           checkboxSelection
//           loading={loading}
//           onRowClick={handleRowClick}
//           onSelectionModelChange={(ids) => setSelectedNotifications(ids)}
//           sx={{
//             '& .MuiDataGrid-columnHeaders': {
//               backgroundColor: '#64748b', // Slate color
//               color: '#ffffff', // White text
//               fontSize: '16px',
//             },
//           }}
//         />
//       </div>
//     </main>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { IconButton } from '@mui/material';
import { FiAlertCircle, FiEye } from 'react-icons/fi';
import axios from 'axios';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/alerts/detectedAnomalies');
        console.log(data);
        setNotifications(data.map((item) => ({
          id: item._id,
          siteId: item.siteId,
          description: item.description,
          date: item.detectedAt,
        })));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/detailAlerts/${params.id}`);
  };

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a'),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleRowClick(params.row)}>
          <FiEye className="text-slate-600 hover:text-slate-800" />
        </IconButton>
      ),
    },
  ];

  return (
    <main className="p-5 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">Detected Anomalies</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={notifications}
          columns={columns}
          pageSize={5}
          loading={loading}
          onRowClick={handleRowClick}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#64748b',
              color: '#ffffff',
              fontSize: '16px',
            },
          }}
        />
      </div>
    </main>
  );
}


