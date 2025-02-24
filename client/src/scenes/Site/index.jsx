// import React from "react";
// import lionVideo from "./lion5.mp4"; // Replace with the actual path to your video file

// const Site = () => {

//   const dispatch = useDispatch();
//   const [Mysites , setMysites] = useState([]);

//   // const UserId  = useSelector((state) => state.global.userId);
//   const UserId  = '67571ca42734500f9170392d'
//   const fetchyourSites = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
//       console.log("Response data:", response.data);
  
//       // Transform the response data
//       const allSites = response.data;

      
  
//       const updatedSiteData = allSites.map((site) => ({
//         SiteID: site._id,
//         SiteName: site.SiteName ,// Use either `SiteName` or `name`
//         SiteAddress: site.SiteAddress , // Use either `SiteAddress` or `address`
//         City: site.City ,
//         Sensitivity: site.Sensitivity , // Default value if `Sensitivity` is missing
//         Active: site.Active  // Ensure `Active` is handled correctly
//       }));
  
//       // Update state
//       setMysites(updatedSiteData);
//       // console.log("Transformed Mysites:", updatedSiteData);
//       console.log("All Mysite:", Mysites);
//       console.log("All Mysite:", Mysites.length);
//     } catch (error) {
//       console.error("Error fetching site data:", error);
//     }
//   };
  
  



// useEffect(() => {
 
//     fetchyourSites();
// }, []);


//   const sites = [
//     {
//       id: 1,
//       name: "Site A",
//       description: "Construction site in downtown.",
//       media: "https://via.placeholder.com/300",
//       cameras: [
//         {
//           id: "C1",
//           name: "Camera 1",
//           status: "Active",
//           media: lionVideo, // Video file path
//           details: "Covers entrance area.",
//         },
//         {
//           id: "C2",
//           name: "Camera 2",
//           status: "Inactive",
//           media: lionVideo, // Video file path
//           details: "Monitors parking lot.",
//         },
//         {
//           id: "C3",
//           name: "Camera 3",
//           status: "Active",
//           media: lionVideo, // Video file path
//           details: "Overlooks the lobby.",
//         },
//         {
//             id: "C4",
//             name: "Camera 4",
//             status: "Active",
//             media: lionVideo, // Video file path
//             details: "Overlooks the garage.",
//           },
//       ],
//     },
//     {
//         id: 2,
//         name: "Site B",
//         description: "Construction site in school.",
//         media: "https://via.placeholder.com/300",
//         cameras: [
//           {
//             id: "C1",
//             name: "Camera 1",
//             status: "Active",
//             media: lionVideo, // Video file path
//             details: "Covers entrance area.",
//           },
//           {
//             id: "C2",
//             name: "Camera 2",
//             status: "Inactive",
//             media: lionVideo, // Video file path
//             details: "Monitors parking lot.",
//           },
//           {
//             id: "C3",
//             name: "Camera 3",
//             status: "Active",
//             media: lionVideo, // Video file path
//             details: "Overlooks the lobby.",
//           },
//           {
//               id: "C4",
//               name: "Camera 4",
//               status: "Active",
//               media: lionVideo, // Video file path
//               details: "Overlooks the garage.",
//             },
//         ],
//       },
//   ];

//   return (
//     <div className="p-6 space-y-6 bg-gradient-to-b from-yellow-500 via-yellow-200 to-yellow-100 min-h-screen">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-black">Supervisor Sites</h1>
//         <p className="text-lg text-gray-700 mt-4">
//           Manage all your assigned sites and monitor their cameras here!
//         </p>
//       </div>

//       {sites.map((site) => (
//         <div
//           key={site.id}
//           className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg p-6 mb-6"
//         >
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-800">{site.name}</h2>
//             <p className="text-gray-600 mt-2">{site.description}</p>
//             <img
//               src={site.media}
//               alt={site.name}
//               className="rounded-lg w-full h-64 object-cover mt-4"
//             />
//           </div>

//           <div className="mt-6">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               Cameras in {site.name}
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {site.cameras.map((camera) => (
//                 <div
//                   key={camera.id}
//                   className="w-full bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow flex-shrink-0 relative"
//                 >
//                   {/* Status Label */}
//                   <div
//                     className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
//                       camera.status === "Active"
//                         ? "bg-green-500 text-white"
//                         : "bg-red-500 text-white"
//                     }`}
//                   >
//                     {camera.status}
//                   </div>

//                   {/* Media Section */}
//                   <div className="cursor-pointer">
//                     <video
//                       src={camera.media}
//                       className="w-full h-48 object-cover rounded-t-lg"
//                       controls
//                       muted
//                     />
//                   </div>

//                   {/* Camera Details */}
//                   <div className="px-4 pb-3">
//                     <h4 className="text-lg font-semibold mt-2">{camera.name}</h4>
//                     <p className="text-sm text-gray-600">{camera.details}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Site;

import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Site = () => {
  const [Mysites, setMysites] = useState([]);
  const navigate = useNavigate();

  const UserId = "675c24c6d8670f67b459203c"; // Replace with actual userId logic

  const fetchYourSites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
      console.log("Response data:", response.data);

      const allSites = response.data.map((site) => ({
        SiteID: site._id,
        SiteName: site.SiteName,
        SiteAddress: site.SiteAddress,
        City: site.City,
        Sensitivity: site.Sensitivity || "Unknown",
        Active: site.Active,
        media: `http://localhost:8000/stream-video/${site.SiteName}.mp4`, // Keeping original API source
      }));

      setMysites(allSites);
    } catch (error) {
      console.error("Error fetching site data:", error);
    }
  };

  useEffect(() => {
    fetchYourSites();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)", // Updated background
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 6,
          bgcolor: "rgba(255, 255, 255, 0.3)", // Translucent background
          borderRadius: 2,
          boxShadow: 3,
          backdropFilter: "blur(10px)", // Blur effect
          width: "100%",
          maxWidth: "1200px", // Keeps content centered and responsive
        }}
      >
                {/* Welcome Section */}
                <Box textAlign="center" mb={4}>
                  <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
                  Supervisor Sites
                  </Typography>
                  <Typography
                    variant="h6"
                    fontFamily="Dancing Script"
                    color="text.secondary"
                  >
                  Manage all your assigned sites and monitor their cameras here!
                  </Typography>
                </Box>

        {/* Dynamic Sites Mapping */}
        {Mysites.map((site) => (
          <Card
            key={site.SiteID}
            sx={{
              mb: 4,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.9)", // Light transparency
              backdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/listing/${site.SiteID}`)}
          >
            {/* Using <img> instead of <video> while keeping the original .mp4 API source */}
            <CardMedia
              component="img"
              height="250"
              image={site.media}
              alt={site.SiteName}
              sx={{ borderRadius: "8px 8px 0 0" }}
            />

            <CardContent sx={{ bgcolor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(5px)" }}>
              <Typography variant="h5" fontWeight="bold" color="black">
                {site.SiteName}
              </Typography>
              <Typography variant="body1" color="black" mt={1}>
                Address: {site.SiteAddress} | City: {site.City}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="black" mt={2}>
                Sensitivity: {site.Sensitivity}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: site.Active ? "green" : "red" }}
              >
                Status: {site.Active ? "Active" : "Inactive"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Site;