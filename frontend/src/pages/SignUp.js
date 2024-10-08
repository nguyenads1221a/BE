import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import loginIcon from '../assest/signin.gif'
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {
  const [showPassword,setShowPassword] =useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const[data,setData]=useState({
    email:"",
    password:"",
    name:"",
    confirmpassword:"",
    profilePic:"",
  })
  const navigate =useNavigate()

  const handleOnChange = (e)=> {
    const {name ,value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] :value
      }
    })
  }
  const handleUploadPic =async(e)=>{
    const file =e.target.files[0]

    const imagePic = await imageTobase64(file)
    console.log("imagePic",imagePic)
    setData((preve)=>{
      return{
        ...preve,
        profilePic:imagePic
      }
    })
  }


  const handleSubmit= async(e)=>{
    e.preventDefault()

    if(data.password === data.confirmpassword){
      const dataRespone = await fetch(SummaryApi.signUp.url,{
      method : SummaryApi.signUp.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const dataApi= await dataRespone.json()

      if(dataApi.success){
        toast.success(dataApi.message)  //đăng nhập thành công gửi thông báo
        navigate("/login")

      } 
      if (dataApi.error){
        toast.error(dataApi.message)  //Đăng nhập không thành công sẽ gửi thông báo
      }

    
  }
  else{
    console.log("Please check password and confirm password")
  }
    }
    


  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto '>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                  <div>
                  <img src={data.profilePic || loginIcon} alt='login icons '/>
                  </div>
                  <form>
                    <label>
                        <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full' >
                        Upload Photo
                        </div>
                      <input type='file' className='hidden' onChange={handleUploadPic}/>
                    </label>
                  </form>
                </div>
                <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>NAME:</label>
                    <div className='bg-slate-200 p-2'>
                      <input 
                        type='text' 
                        placeholder='enter your name' 
                        name='name'
                        value={data.name}
                        onChange={handleOnChange}
                        required
                        className='w-full  h-full bg-transparent'/>
                    </div>
                    </div>
                  <div className='grid'>
                    <label>Email:</label>
                    <div className='bg-slate-200 p-2'>
                      <input 
                        type='email' 
                        placeholder='enter email' 
                        name='email'
                        value={data.email}
                        onChange={handleOnChange}
                        required
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
                         required
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
                  </div>

                  <div>
                    <label>Confirm Password:</label>
                    <div className='bg-slate-200 p-2 flex'>
                      <input type={showConfirmPassword ? "text":"password"}
                         placeholder='enter confirm password'
                         value={data.confirmpassword}
                         name='confirmpassword'
                         onChange={handleOnChange}
                         required
                         className='w-full  h-full bg-transparent'/>
                      <div className='cursor-pointer text-xl'onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                        <span>
                          {
                            showConfirmPassword ?(
                              <FaEyeSlash />
                            )
                            :(
                              <FaEye />
                            )
                          }
                        
                        
                        </span>
                      </div>
                    </div>
                  </div>
                 <button className='bg-red-500 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                </form>
                <p className='my-5'>Already have Account  ?<Link to={"/login"} className='text-red-600 hover:text-red-600 hover:underline'>Login</Link></p>
            </div>
        </div>
        
    </section>
  )
}

export default SignUp