import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import CenterPage from '../components/CenterPage';
import { API_LOGIN } from "../apiConfig";
import { useNavigate } from "react-router-dom"; 

const axios = require('axios').default;


export default function Login(props) {
    const [message, setMessage] = useState({ color: null, text: "" });
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        const password = document.querySelector("#password").value;
        const email = document.querySelector("#email").value;
        
        // Submit POST request to login-endpoint. 
        // On success, store JWT in localStorage
        // On fail display error message
        axios.post(API_LOGIN, {email: email, password: password})
            .then(res => {
            if (res.data.jwt) {
                // Server returned a JWT, that means the login was successful.
                setMessage({ color: "green", text: "Success!" });
                localStorage.setItem("jwt", res.data.jwt);
                localStorage.setItem("email", email);

                navigate("/dashboard");

            } else {
                // No JWT in response, display the response error message.
                setMessage({ color: "red", text: res.data });
            }
            console.log(res);
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
                        <input className="border" type="password" name="password" id="password"/>
                    </div>

                </div>
                
                <button className="border border-gray-500 px-2 py-1 rounded">Login</button>

                <p className='mt-5'>Don't have an account? <Link to='/register' className='text-blue-600'>Create one.</Link></p>

            </Form>
        </CenterPage>
    );
}