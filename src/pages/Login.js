import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import CenterPage from '../components/CenterPage';
const axios = require('axios').default;


export default function Login(props) {
    const [message, setMessage] = useState({ color: null, text: "" });
    const action = "http://localhost:8000/login";

    function onSubmit(e) {
        e.preventDefault();

        const password = document.querySelector("#password").value;
        const username = document.querySelector("#username").value;
        
        // Submit POST request to login-endpoint. 
        // On success, store JWT in localStorage
        // On fail display error message
        axios.post(action, {username: username, password: password})
            .then(res => {
            if (res.data.jwt) {
                // Server returned a JWT, that means the login was successful.
                setMessage({ color: "green", text: "Success!" });
                localStorage.setItem("jwt", res.data.jwt);
                localStorage.setItem("username", username);

            } else {
                // No JWT in response, display the response error message.
                setMessage({ color: "red", text: res.data });
            }
            console.log(res);
        })
    }

    return (
        <CenterPage>
            <Form id="loginForm" method="POST" action={ action } onSubmit={ (e) => onSubmit(e) }>
                <h1 className="text-3xl">Login</h1>

                <p className='text-center mt-2 h-3' style={{ color: message.color }}>{ message.text }</p>

                <div className="my-5">
                    <div className="mb-4">
                        <label htmlFor="username">Username</label><br/>
                        <input className="border" type="text" name="username" id="username"/>
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