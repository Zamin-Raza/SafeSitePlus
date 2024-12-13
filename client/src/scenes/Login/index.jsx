import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signIn , setType } from "@state";
// import { useNavigate } from "react-router-dom";
import NewHeader from '../../components/NewHeader'; // Import NewHeader here

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {type} = useParams();
  // const type = 'supervisor'
  console.log(type)


  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      // Verify if type is defined
      if (!type) {
        setError("Invalid user type. Please try again.");
        setLoading(false);
        return;
      }
  
      // API endpoint for login based on type
      const endpoint = `http://localhost:5000/login/${type}/verify`;
  
      // Send POST request to server
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      // Parse response
      const data = await res.json();
  
      // Handle errors from the response
      if (!data.success) {
        setError(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }
  
      // Log the response (optional, for debugging)
   
      console.log(data);
  
      // Save userId in Redux
      dispatch(signIn(data._id));
      dispatch(setType(type));
      console.log("type of user is " + type);
      console.log("User dispatched to Redux");
  
      // Navigate to the respective dashboard based on user type
      navigate(`/dashboard/${type}`);
  
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  };
  
  return (
    <div>
      <NewHeader /> Add NewHeader component here
      
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email*"
            className="border p-3 rounded-lg hover:border-1 hover:border-[#FBB911] focus:border-1 focus:border-[#FBB911]"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password*"
            className="border p-3 rounded-lg hover:border-1 hover:border-[#FBB911] focus:border-1 focus:border-[#FBB911]"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-500 text-white p-3 rounded-lg uppercase hover:bg-yellow-600 disabled:bg-yellow-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          
          <div className="mr-3 text-end">
            <Link
              to="/forgot-password"
              className="text-gray-700 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

