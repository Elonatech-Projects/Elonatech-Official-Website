import React, { useState } from 'react';
import { BASEURL } from "../../BaseURL/BaseURL";
import { FiEye , FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './AuthContext';


const AdminLogin = () => {
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    let navigate =  useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { email, password };

        try {
            const res = await axios.post(`http://localhost:4000/api/v1/auth/login`, newUser, {
                headers: { "Content-Type": "application/json" }
            });

            localStorage.setItem('token', JSON.stringify(res.data.access));
            login();
            toast.success('Admin Login Successfully');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            toast.error(error.response?.data || 'Login failed');
        }
    };
      
return (
        <>
        <Helmet>
        <meta name="robots" content="nonindex" />
       </Helmet>
{/* Header */}
<div class="container-fluid bg-secondary py-5 " style={{height:"500px" , backgroundImage:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url()`, backgroundRepeat:"no-repeat" , backgroundPosition:"center", backgroundSize:"cover"}}>
 <div class="py-5 mt-5 ">
   <h2 class=" mt-5 text-white text-center">Login</h2>
   <h5 class=" mt-4 text-white text-center"></h5>
   <p class="lead text-white text-center"></p>
 </div>
</div>
    <div className="container mb-5" style={{marginTop:"70px", boxShadow:"rgba(0, 0, 0, 0.4) 0px 30px 90px"}} >
    <div className="row">
     <div className="col-md-7">
     <form action="" onSubmit={handleSubmit} className='mx-auto '>
      <h4 className='text-center mt-5 fw-bold'>Admin Login</h4>
        <div class="mb-3 mt-5">
            <label for="exampleInputEmail1" class="form-label fs-5 fw-bold "> Email </label>
            <input type="email" class="form-control form-controli" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" class="form-text fw-bold text-white ">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
            <label for="exampleInputPassword1" class="form-label fs-5 fw-bold ">Password</label>
            <input type="password" class="form-control form-controli" value={password}  onChange={(e) => setPassword(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <button type="submit"  class="btn btn-danger pe-5 ps-5 btn-lg mt-4 mb-5"><h4>Login</h4></button>
    </form>
     </div>
     <div className="col-md-5">
        <div className="text-center">
        <img src='https://i.stack.imgur.com/qq8AE.gif' data-src='https://res.cloudinary.com/elonatech/image/upload/v1709568938/adminPage/Elonatech_kpz74q.png' className='img-fluid rounded lazyload' alt="" />

        </div>
     </div>
    </div>
   
    </div>


            
        </>
    );
}

export default AdminLogin;



