import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div className='max-w-sm bg-white mx-auto mt-36'>
            <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
            <form className='space-y-5 max-w-sm mx-auto pt-8'>
                 <input
                    type='email'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    required
                    className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                />
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    required
                    className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                />

                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                    className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                />

                {message && <div className='text-red-600'>{message}</div>}

                <button 
                    type="submit"
                    className='w-full py-3 mt-5 bg-primary hover:bg-indigo-500 text-white font-medium rounded-md'
                >
                    Register
                </button>
            </form>

            <p className='my-5 text-center'>
                Already have an account? Please  <Link to="/login" className='text-red-700 italic'>
                     Login
                </Link> 
                
            </p>
        </div>
    );
}

export default Register;
