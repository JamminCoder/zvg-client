import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import CenterPage from '../components/CenterPage';
import { API_LOGIN } from "../apiConfig";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils";

const axios = require('axios').default;


export default function Login(props) {
    const [message, setMessage] = useState({ color: null, text: "" });
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const formData = {
            email: email,
            password: password
        };

        axios.post(API_LOGIN, formData, { withCredentials: true }).then(res => {
            console.log(res.data);
            navigate("/dashboard");

            // Just for the front-end to control rendering 
            localStorage.setItem("logged_in", true);

        }).catch(err => {
            const message = err.response.data.message;
            console.log("ERROR:\n" + message);
        })
    }

    return (
        <CenterPage>
            <Form id="loginForm" method="POST" action={ API_LOGIN } onSubmit={ (e) => onSubmit(e) }>
                <h1 className="text-3xl">Login</h1>

                <p className='text-center mt-2 h-3' style={{ color: message.color }}>{ message.text }</p>

                <div className="my-5">
                    <div className="mb-4">
                        <label htmlFor="email">Email</label><br/>
                        <input className="border" type="email" name="email" id="email"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password">Password</label><br/>
                        <input className="border" type="text" name="password" id="password"/>
                    </div>

                </div>
                
                <button className="border border-gray-500 px-2 py-1 rounded">Login</button>
            
                <p className='mt-5'>Don't have an account? <Link to='/register' className='text-blue-600'>Create one.</Link></p>

            </Form>
        </CenterPage>
    );
}