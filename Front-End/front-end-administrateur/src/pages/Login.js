import { useState, useContext, useEffect } from 'react';
import React from 'react'
import { Redirect } from 'react-router-dom';
import AuthContext from '../components/AuthContext';
import axios from 'axios';

export default function Login() {
    const [login,setLogin] = useState({email : "",password:""});
    const [error,setError] = useState(null);
    const [toHome,setToHome] = useState(false);
    const context = useContext(AuthContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        return () => {};
      }, [context]);

    const handleChange = (event) =>{
        setLogin ({...login, [event.target.name] : event.target.value});
    }

    const handelSubmit = (e)=>{
        console.log({e});
        e.preventDefault();
        axios
            .post('http://localhost:8080/api/admin/login', login)
            .then((response) => {
                setLogin({ email: '', password: '' });
                context.setIsAuthenticated(true);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem(
                'firstname',
                response.data.administrator.firstname
                );
                localStorage.setItem('lastname', response.data.administrator.lastname);
                setToHome(true);
            })
            .catch((error) => {
                console.log(error.response.data);
                setError(error.response.data);
            });
        console.log(error);
        
    }

    return (
        <div className="container" onSubmit = {handelSubmit}>
            {toHome ? <Redirect to="/home" /> : null}
            <h1>Welcome Into The Wild</h1>
            <h3>Merci de t'identifier</h3>
            <form className="container_form">
                <input
                    type="email"
                    name="email"
                    placeholder="Entre ton adresse email..."
                    value={login.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe..."
                    value={login.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">
                    Connexion
                </button>
            </form>
        </div>
    )
}
