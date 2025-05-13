// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import './UserDashboard.css';
// import InviteNeighborsModal from './Components/NeighborModal'; // Import Modal
// import Logo2 from "./Components/Logo2";
// import Serviceprovider from "./Serviceprovider";
// import UserReports from "./UserReports";
// import AllRequests from "./Components/AllRequests";
// import DroppedComplaints from "./Components/DroppedComplaints";

// const UserDashboard = () => {
//   const [location, setLocation] = useState('');
//   const [activepage, setactivepage] = useState('complaint');
//   const [showNeighborModal, setShowNeighborModal] = useState(false); // For Modal
//   const navigate = useNavigate(); 

//   // Fetch user details and protected data
//   useEffect(() => {
//     const userEmail = localStorage.getItem('userEmail');
//     if (userEmail) {
//       axios.get(`http://localhost:4000/user/${userEmail}`)
//         .then(response => {
//           setLocation(response.data.Location);
//           console.log(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching location:', error);
//           localStorage.removeItem('token');
//           localStorage.removeItem('userEmail');
//           navigate('/signin');
//         });

//       fetchProtectedData();
//     } else {
//       navigate('/signin');
//     }
//   }, [navigate]);

//   const fetchProtectedData = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get('http://localhost:4000/protected', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Protected data:', response.data);
//     } catch (error) {
//       console.error('Error fetching protected data:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('userEmail');
//       navigate('/signin');
//     }
//   };

//   // Open/close modal
//   const handleNeighborClick = () => {
//     setShowNeighborModal(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userEmail');
//     navigate('/');
//   };

//   // Render different pages based on the activePage
//   return (
//     <div className="userdashboard">
//       <div className="dashboard1">
//         <div className="Logoo"><Logo2/></div>
//         <div className="Dashbuttons1">
//           <h5>User Dashboard</h5>
//           <div className="Dashbuttons2">
//             <button onClick={() => setactivepage('complaint')} > <img src="new.png" alt="new" />New Report</button>
//             <button onClick={() => setactivepage('mycomplaints')}> <img src="mynew.png" alt="myreports" style={{height:'35px' , width:'35px'}} />My Reports</button>
//             <button onClick={() => setactivepage('Dropped')}> <img src="cross.png" alt="cross" />Dropped Reports</button>
//             <button onClick={() => setactivepage('AllRequests')}> <img src="allnew.png" alt="overallreports" style={{width:'35px'}}/>Overall Reports</button>
//             <button onClick={handleNeighborClick}> <img src="invite.png" alt="invite" />Invite Neighbors</button>
//           </div>
//         </div>
//       </div>

//       <div className="dashboard2">
//         <div className="dashboard2-1">
//           <h4>Your Location: {location || 'Loading...'}</h4>
//           <div className="logout-container">
//             <p onClick={handleLogout}>
//               <img src="logout.png" alt="logout" className="logout-img" />
//               <span className="custom-tooltip">Logout</span>
//             </p>
//           </div>
//         </div>

//         <div className="dashboard2-2">
//           {/* Conditionally render components based on the activePage */}
//           {activepage === 'complaint' && <Serviceprovider />}
//           {activepage === 'mycomplaints' && <UserReports />}
//           {activepage === 'AllRequests' && <AllRequests />}
//           {activepage === 'Dropped' && <DroppedComplaints />}
//         </div>
//       </div>

//       {/* Modal is rendered outside of the button */}
//       {showNeighborModal && (
//         <InviteNeighborsModal
//           showModal={showNeighborModal}
//           setShowModal={setShowNeighborModal}
//         />
//       )}
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";
import InviteNeighborsModal from "./Components/NeighborModal";
import Logo2 from "./Components/Logo2";
import Serviceprovider from "./Serviceprovider";
import UserReports from "./UserReports";
import AllRequests from "./Components/AllRequests";
import DroppedComplaints from "./Components/DroppedComplaints";

const UserDashboard = () => {
  const [location, setLocation] = useState("");
  const [activePage, setActivePage] = useState("complaint");
  const [showNeighborModal, setShowNeighborModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      axios
        .get(`http://localhost:4000/user/${userEmail}`)
        .then((response) => {
          setLocation(response.data.Location);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          navigate("/signin");
        });

      fetchProtectedData();
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Protected data:", response.data);
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/signin");
    }
  };

  const handleNeighborClick = () => {
    setShowNeighborModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  // Define an array of pages and corresponding components
  const pages = {
    complaint: <Serviceprovider />,
    mycomplaints: <UserReports />,
    AllRequests: <AllRequests />,
    Dropped: <DroppedComplaints />,
  };

  // Array to hold button information
  const buttons = [
    { id: "complaint", label: "New Report", icon: "new.png" },
    {
      id: "mycomplaints",
      label: "My Reports",
      icon: "mynew.png",
      iconStyle: { height: "35px", width: "35px" },
    },
    { id: "Dropped", label: "Dropped Reports", icon: "cross.png" },
    {
      id: "AllRequests",
      label: "Overall Reports",
      icon: "allnew.png",
      iconStyle: { width: "35px" },
    },
    {
      id: "invite",
      label: "Invite Neighbors",
      icon: "invite.png",
      action: handleNeighborClick,
    },
  ];

  return (
    <div className="userdashboard">
      <div className="dashboard1">
        <div className="Logoo">
          <Logo2 />
        </div>
        <div className="Dashbuttons1">
          <h5>User Dashboard</h5>
          <div className="Dashbuttons2">
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() =>
                  button.action ? button.action() : setActivePage(button.id)
                }
                className={activePage === button.id ? "active" : ""}
              >
                <img
                  src={button.icon}
                  alt={button.label}
                  style={button.iconStyle || {}}
                />
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard2">
        <div className="dashboard2-1">
          <h4>Your Location: {location || "Loading..."}</h4>
          <div className="logout-container">
            <p onClick={handleLogout}>
              <img src="logout.png" alt="logout" className="logout-img" />
              <span className="custom-tooltip">Logout</span>
            </p>
          </div>
        </div>

        <div className="dashboard2-2">
          {/* Use the activePage state to render the correct component */}
          {pages[activePage]}
        </div>
      </div>

      {showNeighborModal && (
        <InviteNeighborsModal
          showModal={showNeighborModal}
          setShowModal={setShowNeighborModal}
        />
      )}
    </div>
  );
};

export default UserDashboard;

