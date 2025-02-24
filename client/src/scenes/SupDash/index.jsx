import React, { useState , useEffect} from "react";
import AssignedSiteCard from "./AssignedSiteCard"; // Import the AssignedSiteCard component
import NewHeader from "../../components/NewHeader"; // Import NewHeader here
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel styles
import "slick-carousel/slick/slick-theme.css";
import { FaStickyNote, FaPen, FaFileDownload } from "react-icons/fa"; // Import icons for Notepad and Pen
import { Line, Doughnut } from "react-chartjs-2"; // Import both Line and Doughnut charts
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
//import "./index.css";
import { useDispatch , useSelector } from "react-redux";
import axios from 'axios';


// Register all necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SupDash = () => {

  const dispatch = useDispatch();
  const [Mysites , setMysites] = useState([]);

  const UserId  = useSelector((state) => state.global.userId);
  // const UserId  = '675c24c6d8670f67b459203c'

  // const fetchyourSites = async () => {
  //   try {
  //     // const response = await axios.get('http://localhost:5000/Site/myAll', {
  //     //   params: { UserId },
  //     // });
  //     const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
  //     console.log(response.data);

  //     const allSites = response.data;
  
  //     const updatedSiteData = allSites.map(site => ({
  //       SiteID: site._id,
  //       SiteName: site.name,
  //       SiteAddress: site.address,
  //       City: site.city,
  //       Sensitivity: site.sensitivityLevel,
  //     }));
  
  //     setMysites(updatedSiteData);
  

  //   } catch (error) {
  //     console.error("Error fetching site data:", error);
  //   }
  // };

  const sendidtobackend = async () =>{
    try{
      console.log("hn id backend p jany lagi")
      const response = await axios.post(`http://localhost:5000/response/saveID/${UserId}`);

    }
    catch (error){
      console.log(error);

    }
  }

  const fetchyourSites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
      console.log("Response data:", response.data);
  
      // Transform the response data
      const allSites = response.data;

      
  
      const updatedSiteData = allSites.map((site) => ({
        SiteID: site._id,
        SiteName: site.SiteName ,// Use either `SiteName` or `name`
        SiteAddress: site.SiteAddress , // Use either `SiteAddress` or `address`
        City: site.City ,
        Sensitivity: site.Sensitivity , // Default value if `Sensitivity` is missing
        Active: site.Active  // Ensure `Active` is handled correctly
      }));
  
      // Update state
      setMysites(updatedSiteData);
      // console.log("Transformed Mysites:", updatedSiteData);
      console.log("All Mysite:", Mysites);
      console.log("All Mysite:", Mysites.length);
    } catch (error) {
      console.error("Error fetching site data:", error);
    }
  };
  
  



useEffect(() => {
 
    fetchyourSites();
    sendidtobackend();
}, []);

// useEffect(()=>{
//   sendidtobackend();
// },[]);



  const tasks = [
    "Task 1: Review Site A's incident report.",
    "Task 2: Inspect Site B's camera setup.",
    "Task 3: Check progress of Site C.",
    "Task 4: Verify Site D's safety measures.",
    "Task 5: Prepare materials for Site E.",
    "Task 6: Review Site F's construction timeline.",
    "Task 7: Conduct safety drill at Site G.",
  ];

  const SampleNextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-yellow-500 z-10"
      onClick={onClick}
    >
      &rarr;
    </div>
  );
  
  const SamplePrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-yellow-500 z-10"
      onClick={onClick}
    >
      &larr;
    </div>
  );

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   responsive: [
  //     { breakpoint: 1024, settings: { slidesToShow: 2 } },
  //     { breakpoint: 768, settings: { slidesToShow: 1 } },
  //   ],
  // };

  const settings = {
    dots: true,
    infinite: Mysites.length > 1, // Enable infinite scrolling only if more than one site
    speed: 500,
    slidesToShow: Mysites.length > 3 ? 3 : Mysites.length, // Show only the available number of sites
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Mysites.length > 2 ? 2 : Mysites.length } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const [taskLimit, setTaskLimit] = useState();
  const [showMore, setShowMore] = useState(true);

  const handleShowMore = () => {
    setTaskLimit(taskLimit + 5);
    setShowMore(false);
  };

  const handleShowLess = () => {
    setTaskLimit(5);
    setShowMore(true);
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Incidents",
        data: [10, 20, 15, 25, 18, 30, 22],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Resolved Incidents",
        data: [5, 15, 10, 20, 15, 25, 18],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "New Anomalies",
        data: [2, 8, 5, 12, 9, 15, 10],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Incident Trends" },
    },
  };

  // Data for the donut chart
  const data = {
    labels: ['Completed', 'In Progress', 'Pending'], // Labels
    datasets: [
      {
        data: [65, 25, 10], // Data values
        backgroundColor: ['#34D399', '#F59E0B', '#EF4444'], // Colors for each section
        borderWidth: 0, // No border
      },
    ],
  };

  // Options for customizing the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="">
      <NewHeader />
      <div className="p-6 space-y-6 bg-gradient-to-b from-yellow-500 via-yellow-200 to-yellow-100  rounded-lg shadow-lg min-h-screen">

        <div className="glass-effect py-10 px-6 rounded-lg shadow-lg">

            <head>
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@700&display=swap" rel="stylesheet" />
            </head>

            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome, Esteemed Supervisor!</h1>
                <p className="mt-4 text-xl text-gray-800" style={{ fontFamily: 'Dancing Script, cursive' }}>Your expertise and leadership are truly making a difference. Keep up the amazing work!</p>
            </div>


             {/* Combined Section with Gradient Background */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <h4 className="text-lg font-semibold">Total Incidents</h4>
              <p className="text-2xl font-bold text-red-500">50</p>
            </div>
            <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <h4 className="text-lg font-semibold">Workers Injured</h4>
              <p className="text-2xl font-bold text-yellow-500">12</p>
            </div>
            <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <h4 className="text-lg font-semibold">Pending Anomalies</h4>
              <p className="text-2xl font-bold text-green-500">8</p>
            </div>
          </div>

          {/* <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg glass-effect">
  <h3 className="text-xl font-semibold mb-4">Assigned Sites</h3>
  <Slider {...settings}>
  {Mysites.map((site) => (
    <div key={site._id} className="p-2">
      <AssignedSiteCard site={site} />
    </div>
  ))}
  </Slider>
</div> */}

{/* Incident Trends Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white bg-opacity-50 backdrop-blur-md mt-10 rounded-lg shadow-lg p-6">
  {/* Monthly Incident Trends */}
  <div>
    <h3 className="text-xl font-semibold mb-4 text-center">Monthly Incident Trends</h3>
    <div className="h-64">
      <Line data={lineData} options={lineOptions} />
    </div>
  </div>

  {/* Today Incident Trends */}
  <div>
    <h3 className="text-xl font-semibold mb-4 text-center">Today Incident Trends</h3>
    <div className="h-64">
      <Line
        data={{
          labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
          datasets: [
            {
              label: "Incidents Today",
              data: [1, 2, 0, 3, 1, 4, 2],
              borderColor: "rgba(255, 159, 64, 1)",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              tension: 0.4,
            },
            {
              label: "Resolved Today",
              data: [0, 1, 0, 2, 0, 3, 1],
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Today Incident Trends" },
          },
        }}
      />
    </div>
  </div>
</div>

        </div>

        {/* Row 1: Notifications and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow glass-effect">
            <h3 className="text-xl font-semibold mb-4">Notifications/Alerts</h3>
            <div className="relative max-h-32 overflow-hidden">
              <ul className="space-y-2">
                {[ 
                  "New incident reported at Site A.",
                  "Site B: Camera disconnected.",
                  "Weekly stats updated.",
                  "Camera maintenance scheduled.",
                  "Site C: Progress report uploaded.",
                  "Site D: Security alert.",
                ]
                  .slice(0, 5) // Limit to 5 notifications
                  .map((notification, index) => (
                    <li
                      key={index}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white p-3 rounded-lg shadow-md"
                    >
                      - {notification}
                    </li>
                  ))}
              </ul>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => (window.location.href = "/notifications")}
                className="w-full px-4 py-2 bg-yellow-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-yellow-600 bg-opacity-70"
              >
                See More
              </button>
            </div>
          </div>

          <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow glass-effect">
      <h3 className="text-xl font-semibold mb-4">Stats Overview</h3>
      <div className="h-48 flex  ">
        <Doughnut data={data} options={options} />
      </div>
    </div>
        </div>

{/* Assigned Sites */}





<div className="flex flex-col lg:flex-row items-stretch lg:space-x-6 space-y-6 lg:space-y-0">
  {/* Notepad Section */}
  <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full lg:w-1/2 glass-effect flex-1">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4 mb-4">
        <FaPen className="text-yellow-500 text-2xl" />
        <h3 className="text-xl font-semibold">Notepad</h3>
      </div>
      <button
        onClick={() => (window.location.href = "/notepad")}
        className="px-4 py-2 bg-yellow-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-yellow-600 bg-opacity-70 mb-3"
      >
        Go to Notepad
      </button>
    </div>
    <div className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-inner relative">
      {/* Scrollable tasks */}
      <ul className="space-y-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-rounded-full scrollbar-track-transparent">
        {tasks.slice(0, taskLimit).map((task, index) => (
          <li
            key={index}
            className="bg-gradient-to-r from-green-100 to-green-300 text-gray-800 p-3 rounded-lg shadow-md"
          >
            <span className="font-semibold">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Report Generation Section */}
  <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full lg:w-1/2 glass-effect flex-1">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4 mb-4">
        <FaFileDownload className="text-yellow-500 text-2xl" />
        <h3 className="text-xl font-semibold">Generate Reports</h3>
      </div>
    </div>
    <div className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-inner">
      <p className="text-gray-700 mb-9">
        Create detailed reports for your tasks and download them in various formats. Choose your options below.
      </p>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">Select Format</label>
          <select className="p-2 bg-gray-100 rounded-lg border focus:outline-none">
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
          </select>
        </div>
        <button
          type="button"
          className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600"
        >
          Generate Report
        </button>
      </form>
    </div>
  </div>
</div>

{/* -------------- */}
</div>

    {/* <div className="flex justify-center mt-4 ">
      {taskLimit < tasks.length && (
        <button
          onClick={handleShowMore}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600"
        >
          Show More
        </button>
      )}
      {taskLimit > 5 && (
        <button
          onClick={handleShowLess}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600"
        >
          Show Less
        </button>
      )}
    </div> */}
  </div>

  );
};

export default SupDash;