import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './ServiceProvider.css';

const Serviceprovider = () => {
    const [Tehsil , setTehsil] = useState('') 
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
          axios.get(`http://localhost:4000/user/${userEmail}`)
            .then(response => {
              setTehsil(response.data.Tehsil);
              console.log(response.data);
              
            })
            .catch(error => {
              console.error('Error fetching location and tehsil:', error);
              localStorage.removeItem('token');  // Clear token if there's an error
              localStorage.removeItem('userEmail');
              navigate('/signin');
            });
    
          fetchProtectedData();
        } else {
          navigate('/signin');
        }
      }, [navigate]);


      const fetchProtectedData = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('http://localhost:4000/protected', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Protected data:', response.data);
        } catch (error) {
          console.error('Error fetching protected data:', error);
          localStorage.removeItem('token');  // Clear token if there's an error
          localStorage.removeItem('userEmail');
          navigate('/signin');
        }
      };

    
    return(
        <div> 
          <div className="serviceheading" style={{marginTop : '134px'}}><p>Service Providers</p></div>
            <div className="card">
          <div className="card1">
           <h1>TMA {Tehsil}</h1>
           <br />
           <h2>Tehsil Municipal Administration {Tehsil}</h2>
         </div>
         <div className="card2">
           <div className="card2-1">
             <p className="numberofrequests">00</p>
             <p className="resolved">Requests Resolved All times</p>
           </div>
           
           <div className="card2-2" style={{alignItems:'center', marginTop:'20px', justifyContent:'center' , display:'flex'}}> 
            <div style={{marginBottom:'15px'}}>     
            <Link to={'/newrequest'} >    
                  <span style={{display:"flex" , paddingTop:'5px', justifyContent:'center',alignItems:'center', textDecoration:'none'}}>
                    <img src="plus.png" alt="" style={{width:'50px'}}/><h3 style={{textDecoration:'none' , margin:'5px'}}>New Report</h3></span>
            </Link> 
            </div>
           </div>
          
         </div> 
        </div>
        </div>
    )
}

export default Serviceprovider;