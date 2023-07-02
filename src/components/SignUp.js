import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signUp.css';

const SignupPage = () => {
  const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v2/users",
            {
                name: name,
                email: email,
                password: password
            });

            if (response.ok) {
              navigate('/dashboard');
            }else{
              alert("User Registration Failed!!");
            }
    } catch (err) {
        alert("User Registration Failed!!");
    }
}
  return (
    <div className="container">
    <form>
        <div className="mb-3">
            <h1 className="mb-4">Add and Update User Here</h1>
            <label htmlFor="user_id" className="form-label"></label>
            <input type="text" className="form-control" id="user_id" hidden
                value={id}
                onChange={(event) => {
                    setId(event.target.value);
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">User Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Your Name"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Your Email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Your Password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
        </div>
        <button className="btn btn-primary" onClick={save}>Register</button>
    </form>
</div>

  );
};

export default SignupPage;
