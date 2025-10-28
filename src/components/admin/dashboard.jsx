
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { FiArchive } from "react-icons/fi";
import './dashboard.css'
import { AiOutlineDashboard } from 'react-icons/ai';
// import { BASEURL } from "../../BaseURL/BaseURL";

const Dashboard = () => {
    const [visitorData, setVisitorData] = useState([]);

    const divStyle = {
        backgroundColor: 'lightblue',
        padding: '5px 10px',
        fontSize: '18px',
        marginLeft: '-120px',
        marginBottom: '-300px',
        borderRadius: '10px',
      };

    // useEffect(() => {
    //     const fetchVisitorData = async () => {
    //         try {
    //             const currentYear = new Date().getFullYear();

    //             // Fetch data from the backend API
    //             const response = await axios.get(`/api/v1/visitors/monthly?year=${currentYear}`);

    //             // Map month numbers (1-12) to their names
    //             const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //             // Transform the data from the API to fit the chart format
    //             const transformedData = response.data.visitors.map(v => ({
    //                 month: months[v._id.month - 1],  // Convert month number to name (0-indexed array)
    //                 visitors: v.count  // Use the count of visitors for each month
    //             }));

    //             // Set the transformed data to state
    //             setVisitorData(transformedData);
    //         } catch (error) {
    //             console.error("Error fetching visitor data:", error);
    //         }
    //     };

    //     fetchVisitorData(); 
    // }, []);


    useEffect(() => {
        const fetchVisitorData = async () => {
            try {
                const currentYear = new Date().getFullYear();
    
                const response = await axios.get(`https://backend-api-mbln.onrender.com/api/v1/visitors/monthly?year=${currentYear}`);

                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
                const transformedData = response.data.visitors.map(v => ({
                    month: months[v._id.month - 1], 
                    visitors: v.count 
                }));
    
                setVisitorData(transformedData);
            } catch (error) {
                console.error("Error fetching visitor data:", error);
            }
        };
    
        fetchVisitorData(); 
    }, []);

    return (
        <>
            <div class="container-fluid bg-secondary py-5 " style={{height:"500px" , backgroundImage:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/elonatech/image/upload/v1726158384/admin_page_usqzlr.jpg)`, backgroundRepeat:"no-repeat" , backgroundPosition:"center", backgroundSize:"cover"}}>
                <div class="py-5 mt-5 ">
                <h2 class=" mt-5 text-white text-center">Admin Dashboard</h2>
                <h5 class=" mt-4 text-white text-center">Empower your management with real-time insights and control over every aspect of your business.</h5>
                <p class="lead text-white text-center">The Admin Dashboard provides a centralized hub for monitoring performance, optimizing workflows, and making informed decisions to drive your business forward.</p>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center py-2 px-4" style={{ borderBottom: "2px solid #e3e3e3" }}>
                <Link to="/" className="d-flex align-items-center text-decoration-none">
                    <h5 className="fw-bold ms-2" style={{ color: "#00512c" }}>Elonatech Nigeria Admin</h5>
                </Link>
                <div className="d-flex align-items-center">
                    <span style={{ marginRight: "10px", color: "#6c757d" }}>Welcome</span>
                    <img src="https://elonatech.com.ng/static/media/Elonatech%20icon.176a8c1916da20a23e4f.png" alt="Logo" style={{ height: "30px", width: "30px" }} />
                </div>
            </div>

            <div className='dashboard'>
                <Link to="/dashboard" className="btn btn-outline-primary btn-sm me-3 dash">
                    <AiOutlineDashboard className="icon" /> Dashboard
                </Link>
            </div>
            <main className="container py-5 my-5 mb-5">

            <div className="row" data-masonry='{"percentPosition": true }'>
                <div className="col-sm-6 col-lg-4 mb-4" style={{cursor:"pointer"}}>
                    <Link to='/write' className="text-decoration-none">
                        <div className="card text-bg-danger text-center p-3">
                            <figure className="mb-0 text-decoration-none">
                                <blockquote className="blockquote">
                                    <h4> Create Blog</h4>
                                </blockquote>
                            </figure>
                        </div>
                    </Link>
                </div>

                <div className="col-sm-6 col-lg-4 mb-4" style={{cursor:"pointer"}}>
                    <Link to='/computer-write' className="text-decoration-none">
                        <div className="card text-bg-success text-center  p-3">
                            <figure className="p-3 mb-0">
                                <blockquote className="blockquote">
                                    <h4>Upload Computer</h4>
                                </blockquote>
                            </figure>
                        </div>
                    </Link>
                </div>

                <div className="col-sm-6 col-lg-4 mb-5" style={{cursor:"pointer"}}>
                    <Link to='/shop-write' className="text-decoration-none">
                        <div className="card text-bg-primary text-center p-3">
                            <figure className="mb-0">
                                <blockquote className="blockquote">
                                    <h4 className="text-white">Upload All Products</h4>
                                </blockquote>
                            </figure>
                        </div>
                    </Link>
                </div>
            </div>

                <div className="row mt-4">
                    <div className="col-sm-6 col-lg-4 mb-3">
                        <Link to='/blog' className="btn btn-outline-danger w-100">View Blog Page</Link>
                    </div>
                    <div className="col-sm-6 col-lg-4 mb-3">
                        <Link to='/computers' className="btn btn-outline-success w-100">View Computer Page</Link>
                    </div>
                    <div className="col-sm-6 col-lg-4 mb-3">
                        <Link to='/shop' className="btn btn-outline-primary w-100">View Shop Page</Link>
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className="mb-4">Visitor Analytics</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={visitorData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </main>
        </>
    );
}

export default Dashboard;
