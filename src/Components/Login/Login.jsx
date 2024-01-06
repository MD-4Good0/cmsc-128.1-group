import React, { useState } from 'react';
import './Login.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import logo_icon from '../Assets/Logo.png';
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

Userfront.init("8nwyy85n");

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state
    const navigate = useNavigate();

    const navigateAfterLogin = () => {
        navigate("/");
    }

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert("Email and password cannot be blank.");
            return;
        }
    
        try {
            setIsLoading(true);
    
            const response = await Userfront.login({
                method: "password",
                email: email,
                password: password,
            });
    
            console.log("Login Response:", response);
    
            if (response?.success === true) {
                navigateAfterLogin();
            }
        } catch (error) {
            alert("Incorrect username and password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <div className="logo">
                <img src={logo_icon} alt="Logo" />
            </div>
            <div className="em-pass">               
                <div className="input">
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input">
                    <input 
                        type={visible ? "text" : "password"}
                        value={password} 
                        id="password" 
                        placeholder="Enter Password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="eyecon" onClick={() => setVisible(!visible)}>
                        <button>
                            {visible ? <img src={eyeOpen} alt="Show Password" /> 
                                     : <img src={eyeClose} alt="Hide Password" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="login-button" onClick={handleLogin}>
                {/* Show loading text or spinner based on isLoading state */}
                {isLoading ? (
                    <button className="login-button-text">Logging in...</button>
                ) : (
                    <button className="login-button-text">Login</button>
                )}
            </div>
        </div>
    );
}

export default Login;
