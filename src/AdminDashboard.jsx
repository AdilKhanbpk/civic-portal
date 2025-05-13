import React, { useState, useEffect } from 'react';
import Logo2 from './Components/Logo2'; 
import './AdminDashboard.css'; 
import { useNavigate } from "react-router-dom";
import AllRequestsAdmin from "./Components/AllRequestsAdmin";
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [p , setp] = useState('All Requests');
  const [tehsilname , settehsilname] = useState('')
  const [elements , setelements] = useState('false')
  const showelements = () => {
    setelements(prevState => !prevState);
  }

  const navigate = useNavigate();


  useEffect(() => {
   const gettehsil = () => {
    const token = localStorage.getItem('Token');
    const decodetoken = jwtDecode(token);
    settehsilname(decodetoken.Tehsil);
    console.log(tehsilname);
  };
  gettehsil();
  },[] )
  
  
  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('AdminEmail');
    navigate('/');
  };


return (
  <div className="userdashboard">
    <div className="dashboard1">
      <div className="Logoo">
        <Logo2 />
      </div>
      <div className="Dashbuttons1">
        <h5 style={{fontWeight:'100' , fontSize:'26px'}}>Tehsil : {tehsilname}</h5>
        <div className="Dashbuttons2">
          <button
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => {setSelectedCategory('all'); setp('All Requests')}}
          >
            All Requests
          </button>
          <button
            className={selectedCategory === 'completed' ? 'active' : ''}
            onClick={() => {setSelectedCategory('completed') ; setp('Completed Requests')}}
          >
            Completed Requests
          </button>
          <button
            className={selectedCategory === 'pending' ? 'active' : ''}
            onClick={() => {setSelectedCategory('pending') ; setp("Pending Requests")}}
          >
            Pending Requests
          </button>
          <button
            className={selectedCategory === 'Dropped' ? 'active' : ''}
            onClick={() => {setSelectedCategory('Dropped') ; setp("Dropped Requests")}}
          >
            Dropped Reports
          </button>
          <button
            className={selectedCategory === 'scheduled' ? 'active' : ''}
            onClick={() => {setSelectedCategory('scheduled'); setp("Scheduled Requests")}}
          >
            Scheduled Requests
          </button>
          <button
            className={selectedCategory === 'not-scheduled' ? 'active' : ''}
            onClick={() => {setSelectedCategory('not-scheduled'); setp('Not Scheduled Requests')}}
          >
            Not-Scheduled Requests
          </button>
          <button
            className={selectedCategory === 'today' ? 'active' : ''}
            onClick={() => {setSelectedCategory('today') ; setp('Today Tasks')}}
          >
            Today Tasks
          </button>
        </div>
      </div>
      {/* <div className="requestsdiv">
        <AllRequestsAdmin selectedCategory={selectedCategory} />
      </div> */}
    </div>

    <div className="dashboard2">
      <div className="dashboard2-1" style={{zIndex:'1000'}}>
        <h4 style={{fontSize : '26px', marginTop:'27px' , marginBottom:'27px'}}>Administration Dashboard</h4>
        <div className="logout-container">
          <p onClick={handleLogout}>
            <img src="logout.png" alt="logout" className="logout-img" />
            <span className="custom-tooltip">Logout</span>
          </p>
        </div>
      </div>
      <div className="dahsboard2-2" >
        <p style={{fontSize:'26px' , fontWeight:'500', marginLeft:'1.3vw' , marginTop:'132px' , marginBottom:'-22px'}}>{p}</p>
      <AllRequestsAdmin selectedCategory={selectedCategory} />
            </div>
    </div>
  </div>
);
}


export default AdminDashboard;
