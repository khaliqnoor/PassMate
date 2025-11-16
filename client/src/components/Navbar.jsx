import React from 'react'
import github from '../assets/github.png'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <>
    <div className="flex justify-around items-center bg-[#050816]/40 backdrop-blur-md shadow-md border-b border-white/10 fixed top-0 left-0 w-full py-3 z-50">
    
     <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-500 to-indigo-400 text-transparent bg-clip-text">
       PassMate
     </h1>
     <div className='flex gap-6'>
        <UserButton />
     <div>
     <button className='flex items-center border border-gray-300 rounded-md cursor-pointer'>
     <a href=""><img src={github} alt="" className='w-9 h-9 ' /></a>  
        <h2 className='text-white'>Github</h2>
     </button>
  
     </div>
        </div>
    </div>
    </>
  )
}

export default Navbar
