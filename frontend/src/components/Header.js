import React from 'react'
import Logo from './Logo'
import { RiSearchLine } from "react-icons/ri";
import { LuUserCircle } from "react-icons/lu";
import { AiFillShopping } from "react-icons/ai";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
     <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between '>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50}/>
            </Link>
        </div>

        <div className='hidden  lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder=' Tìm Kiếm Ở Đây.....'className='w-full outline-none pl-2'/>
          <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white'>
          <RiSearchLine />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='text-3xl'>
          <LuUserCircle />
          </div>
          <div className='text-2xl relative'>
            <span><AiFillShopping /></span>
            <div className='bg-black text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-0 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>
          
          <div>
            <Link to={"/login"} className='px-2 py-1 rounded-full bg-black text-white hover:bg-slate-400'>
              Login
            </Link>
          </div>
        </div>
      </div>
     </header>
  )
}

export default Header