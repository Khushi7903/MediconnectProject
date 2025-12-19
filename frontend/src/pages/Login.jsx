import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [triggered, setTriggered] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    return;

    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        setState('OTP')
      } else {
        toast.error(data.message)
      }
    }
  }

  const signUp = async () => {
    const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
    if (data.success) {
      setState('OTP')
    } else {
      toast.error(data.message)
    }
  }

  const Login = async () => {
    const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

    if (data?.success) {
      setState('OTP')
    } else {
      toast.error(data.message)
    }
  }

  const triggerOtp = async () => {
    const { data } = await axios.post(backendUrl + '/api/user/otp/gen', { email })
    if (!data?.success) {
      toast.error(data.message)
    } else if (data?.message) {
      toast.info(data.message)
    }
  }

  const triggerResetOtp = async () => {
    const { data } = await axios.post(backendUrl + '/api/user/otp/gen', { email })
    if (!data?.success) {
      toast.error(data.message)
    } else if (data?.message) {
      setTriggered(true);
      toast.info(data.message);
    }
  }

  const verifyOtp = async () => {
    const { data } = await axios.post(backendUrl + '/api/user/otp/verify', { email, password, otp })
    if (data?.success) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } else {
      toast.error(data.message)
    }
  }

  const resetPassword = async () => {
    if (!email || !otp || !password) {
      toast.error('please fill all the fields');
      return;
    }
    const { data } = await axios.post(backendUrl + '/api/user/reset', { email, password, otp })
    if (!data.success) {
      toast.error(data.message);
    }
    setToken(data.token)
    localStorage.setItem('token', data.token)
  }

  const chain = (match, options) => {
    let res = <></>;
    options.forEach(element => {
      element.opt === match ?
        res = (<>{element.html}</>) : (<></>);
    });
    return res;
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{chain(state, [
          { opt: 'Login', html: 'Login' },
          { opt: 'Sign Up', html: 'Sign Up' },
          { opt: 'OTP', html: 'Verify OTP' },
          { opt: 'Reset', html: 'Rest Password' },
        ])}</p>

        <p>Please {chain(state, [
          { opt: 'Login', html: 'log in' },
          { opt: 'Sign Up', html: 'sign up' },
          { opt: 'OTP', html: 'enter OTP' },
          { opt: 'Reset', html: 'enter OTP' }
        ])} to book appointment</p>

        {state === 'Reset' ? 
          <div className='w-full '>
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
          </div>
          : ''
        }
        
        {state === 'Sign Up' ? 
          <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          : ''
        }

        {state === 'OTP' || state === 'Reset' ? 
          <div className='w-full '>
            <p>OTP</p>
            <input disabled={state === 'Reset' && !triggered} onChange={(e) => { setOtp(e.target.value) }} value={otp} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="number" required />
          </div>
          : ''
        }

        {state === 'Login' || state === 'Sign Up' ? 
          <>
            <div className='w-full '>
              <p>Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full '>
              <p>Password</p>
              <div className="relative">
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                  type={passwordVisible ? "text" : "password"} 
                  required 
                />
                <span 
                  onClick={() => setPasswordVisible(!passwordVisible)} 
                  className="absolute right-2 top-3 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>
          </>
          : ''
        }

        {state === 'OTP' ?  
          <button onClick={verifyOtp} className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Verify</button> 
          : ''
        }
        {state === 'OTP' ? 
          <button onClick={triggerOtp} className='bg-primary text-white w-full py-2 my-2 rounded-md text-base hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'>
            Send OTP!!
          </button> 
          : ''
        }

        {(state === 'Reset') ? 
          <button onClick={triggerResetOtp} className='bg-primary text-white w-full py-2 my-2 rounded-md text-base hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'>
            Send OTP!!
          </button>
        :''}

        {(state === 'Reset' && triggered) ? 
          <div className='w-full '>
            <p>Password</p>
            <input placeholder='Enter new Password' onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
          </div> 
          : '' 
        }

        {state === 'Sign Up' ? 
          <button onClick={signUp} className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Create account</button> 
          : ''
        }

        {state === 'Login' ?  
          <button onClick={Login} className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Login</button> 
          : ''
        }

        {state === 'Reset' ? 
          <button onClick={resetPassword} className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Reset Password</button> 
          : ''
        }

        {state === 'Sign Up' ? 
          <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }

        {state === 'Reset' ? 
          <p>Login <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Click here</span></p> :
          <p>Forgot password <span onClick={() => setState('Reset')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
