import React, { useState } from 'react'
import { Await, Link } from 'react-router-dom';
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const Login = () => {
  const [showPassword,setShowPassword] =useState(false)
  const[data,setData]=useState({
    email:"",
    password:""
  })
  const handleOnChange = (e)=> {
    const {name ,value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] :value
      }
    })
  }
  const handleSubmit= async(e)=>{
    e.preventDefault()
    const dataRespone = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,
      headers :{
        "content-type":"application/json"
      },
      body :JSON.stringify(data)
    })

    const dataApi = await dataRespone.json()
    if(dataApi.success){
      toast.success(dataApi.message)
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
    
  }
  console.log("data login",data)
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto '>
                <div className='w-20 h-20 mx-auto'>
                <img src={loginIcon} alt='login icons '/>
                </div>
                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                  <div className='grid'>
                    <label>Email:</label>
                    <div className='bg-slate-200 p-2'>
                      <input 
                        type='email' 
                        placeholder='enter email' 
                        name='email'
                        value={data.email}
                        onChange={handleOnChange}
                        className='w-full  h-full bg-transparent'/>
                    </div>
                    
                  </div>
                  <div>
                    <label>Password:</label>
                    <div className='bg-slate-200 p-2 flex'>
                      <input type={showPassword ? "text":"password"}
                         placeholder='enter password'
                         value={data.password}
                         name='password'
                         onChange={handleOnChange}
                         className='w-full  h-full bg-transparent'/>
                      <div className='cursor-pointer text-xl'onClick={()=>setShowPassword((preve)=>!preve)}>
                        <span>
                          {
                            showPassword ?(
                              <FaEyeSlash />
                            )
                            :(
                              <FaEye />
                            )
                          }
                        
                        
                        </span>
                      </div>
                    </div>
                    <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600' >
                    Forgot Password ?</Link>
                  </div>
                 <button className='bg-red-500 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                <p className='my-5'>Don't Have Account ?<Link to={"/sign-up"} className='text-red-600 hover:text-red-600 hover:underline'>Sign up</Link></p>
            </div>
        </div>
        
    </section>
  )
}

export default Login