import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./SignInPage.css";
import jsonData from "../../data.json"; // Import mock data
import api from '../../api/api'

const SignInPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated,setToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [managementAssistants, setManagementAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from localStorage or fallback to jsonData
  useEffect(() => {
    try {
      const storedMAs = JSON.parse(localStorage.getItem("managementAssistants"));

      if (storedMAs && storedMAs.length > 0) {
        setManagementAssistants(storedMAs);
      } else if (jsonData && jsonData.managementAssistants) {
        setManagementAssistants(jsonData.managementAssistants);
      } else {
        setError("Management Assistant data not found");
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", email, password);
    console.log("Available Assistants:", managementAssistants);

    // Check if entered email & password match any management assistant
    // const user = managementAssistants.find(
    //   (user) => user.email === email && user.password === password
    // );

    // if (user) {
    //   //console.log("Login successful for:", user);
    //   //setIsAuthenticated(true);
    //   //navigate("/ma-page");
    // } else {
    //   alert("Invalid email or password");
    // }
    
    //atual api call
    try {
      const response=await api.post('/login',
        {
          username: email,
          password: password,
        }
      )
      console.log(response)
      setToken(response)
      setIsAuthenticated(true);

      navigate("/ma-page");
    } catch (error) {
      console.log(error)
      alert("Invalid email or password");
    }


  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label>Email Address:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>
        <p className="create-new" onClick={() => navigate("/register-ma")}>Create New</p>
      </div>
    </div>
  );
};

export default SignInPage;
