import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext/UserContext';
import './Login.css';

const Login = () => {
    const [error, setError] = useState(null);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        if(password > 8){
            setError('Password Must be 8 charecter');
            return;
        }
        signIn(email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            form.reset();
            navigate(from, {replace: true});
        })
        .catch(error =>{
            console.error(error)
        })
        
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='Your Email' required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder='Password' required />
            </div>
            <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>New to ema john? <Link to='/signup'>Create a new account</Link></p>
            <p>{error}</p>
        </div>
    );
};

export default Login;