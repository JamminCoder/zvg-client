import { useState } from 'react';
import CenterPage from '../components/layouts/CenterPage';
import { API_LOGIN } from "../apiRoutes";
import { useNavigate } from "react-router-dom";
import { WITH_CREDENTIALS } from "../lib/auth";

const axios = require('axios').default;


export default function Login(props) {
    const [message, setMessage] = useState({ color: "", text: "" });
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const formData = {
            email: email,
            password: password
        };

        axios.post(API_LOGIN, formData, WITH_CREDENTIALS).then(res => {
            console.log(res.data);
            navigate("/dashboard");
            window.location.reload();

            // Just for the front-end to control rendering 
            localStorage.setItem("logged_in", true);

        }).catch(err => {
            const message = err.response.data.message;
            setMessage({ color: "red", text: message });
            console.log("ERROR:\n" + message);
        })
    }

    return (
        <CenterPage className="bg-slate-50">
            <form id="loginForm" method="POST" className="p-5 shadow-md bg-white rounded" action={ API_LOGIN } onSubmit={ (e) => onSubmit(e) }>
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
            </form>
        </CenterPage>
    );
}