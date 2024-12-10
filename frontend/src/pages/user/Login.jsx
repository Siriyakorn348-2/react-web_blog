import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/features/auth/auhtApi' 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loginUser,{isLoading: loginLoading}] = useLoginUserMutation()


    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
       // console.log(data)
       try{
        const response = await loginUser(data).unwrap()
        console.log(response)
        const {token , user} = response

         // เก็บ token ใน localStorage หรือ Redux
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser({ user, token }));

        alert("Login successful")
        navigate('/')
        console.log("Navigation successful");
       }catch (err) {
        if (err.data && err.data.message) {
          setMessage(err.data.message);  // ถ้ามีข้อความที่ถูกส่งจาก API
        } else {
          setMessage("Please provide a valid email and password");
        }
      }
      
    }



  return (
    <div className='max-w-sm bg-white mx-auto mt-36'>
        <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
        <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
            <input type='email' value={email}
            placeholder='Email'
            required
            onChange={(e)=> setEmail(e.target.value)}
            className='w-full bg-bgPrimary focus:outline-none px-5 py-3'/>

            <input type='password' value={password}
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
            className='w-full bg-bgPrimary focus:outline-none px-5 py-3'/>

            {
                message && <div className='text-red-600 '>{message}</div>
            }
      <button 
  disabled={loginLoading}
  className='w-full py-3 mt-5 bg-primary hover:bg-indigo-500 text-white font-medium rounded-md'>
  {loginLoading ? 'Logging in...' : 'Login'}
</button>

        </form>
        <p className='my-5 text-center'>Don't have an accoun? <Link to="/register"
        className='text-red-700 italic'>Register</Link> here.</p>
      
    </div>
  )
}

export default Login
