import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCamera, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import Contact from '../../components/Contact';  // Import the Contact component
import lionVideo from "./lion5.mp4"; // Import the video file
import axios from 'axios';

export default function Listing() {
  const [copied, setCopied] = useState(false);
  const params = useParams();

  const [specificSite, setSpecific] = useState(null); // State for fetched site data
  const { siteId } = useParams();

  const fetchSpecificSite = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Site/SpecificSite/${siteId}`
      );
      console.log(response.data)

      if (response && response.data) {
        const mydata = response.data;
        const tempSite = {
          siteId: mydata.SiteID,
          siteName: mydata.SiteName,
          Active: mydata.Active,
          Sensitivity: mydata.Sensitivity,
          SiteAddress: mydata.SiteAddresss,
          City: mydata.City,
          media:"http://localhost:8000/stream-video/processed_indianworkers.mp4", // Placeholder media if not provided in API
        };
        console.log(tempSite)
        setSpecific(tempSite);
        // console.log(specificSite.length())
        console.log("djsdsa")
        console.log(specificSite)
      } else {
        console.error("No data found for the site.");
      }
    } catch (e) {
      console.error("Error fetching specific site data:", e);
    }
  };

  useEffect(() => {
    fetchSpecificSite();
  }, [siteId]);

  if (!specificSite) {
    return <p>Loading site details...</p>;
  }

  // Sample Data for the Camera Feed and Listing
  const listing = {
    id: params.listingId,
    name: "Parking Lot Camera 2", // Update camera name to reflect its role
    status: "Inactive",
    media: lionVideo, // Set video source to the imported video
    address: "123 Dream Lane, Springfield, USA",
    description: "The camera labeled Parking Lot Camera 2 is designed to monitor the parking lot, ensuring security and surveillance of the area. Currently, the camera is in an Inactive status, meaning it is not actively recording or transmitting any footage at this time. Once activated, it will start recording video, which can be accessed through the provided link. The camera's main function is to provide real-time video monitoring of the parking lot, offering insights into any unusual activities. It is located at and serves as a key security feature for the premises. The camera provides high-definition footage, ensuring clear visibility of all monitored areas. However, as of now, it is inactive and requires manual activation to start functioning.",
    status: "Inactive",
    userRef: "12345", // For contacting admin
  };

  return (
    <main>
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        {/* Camera View Section */}
        <div className="h-[550px]">
          {/* Camera Video Feed */}
          <img src="http://localhost:8000/stream-video/processed_indianworkers.mp4" />
          {/* <video
            title="Camera View"
            src={specificSite.media} // Video feed
            className="w-full h-full"
            controls
          /> */}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">
            {specificSite.SiteName} {/* Display the camera name */}
          </div>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
        </div>
        {copied && (
          <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
            Link copied!
          </p>
        )}

        {/* Address Section */}
        <p className="flex items-center gap-2 text-slate-600 text-sm">
          <FaMapMarkerAlt className="text-green-700" />
          {specificSite.SiteAddress}
        </p>

        {/* Active or Inactive Status */}
        <div className="flex gap-4 mt-2">
          <p className={`w-full max-w-[200px] text-white text-center p-1 rounded-md ${listing.status === "Active" ? "bg-green-900" : "bg-red-900"}`}>
            {specificSite.status == true ? "Active" : "Inactive"}
          </p>
        </div>

        {/* Description Section */}
        <p className="text-slate-800 mt-4">
          <span className="font-semibold text-black">Description - </span>
          {/* {listing.description} */}
          {specificSite.City}
        </p>

        {/* Camera Features */}
        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-6">
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaShare className="text-lg" />
            {listing.media ? (
              <a href={listing.media} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            ) : (
              "No Media Available"
            )}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaCamera />
            {/* You can add more details like camera model or features */}
            {listing.description ? "High-definition monitoring of parking lot." : "No details available"}
          </li>
        </ul>

        {/* Contact Component */}
        <Contact listing={listing} />  {/* Pass listing as prop to Contact */}
      </div>
    </main>
  );
}
