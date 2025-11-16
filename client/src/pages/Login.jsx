import React from 'react'
import group_users from '../assets/group_users.png'
import { Star } from 'lucide-react'
import {SignIn} from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row  bg-[#050816]'>

        <div className='flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40'>
         <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-500 to-indigo-400 text-transparent bg-clip-text">
             PassMate
         </h1>
           <div>
            <div className='flex items-center gap-3 mb-4 max-md:mt-10'>
                <img src={group_users} className='h-8 md:h-10' alt="" />
                <div>
                    <div className='flex'>
                        {Array(5).fill(0).map((_, i)=> (<Star key={i} className='size-4 md:size-4.5 text-transparent fill-amber-500' />))}
                    </div>
                    <p className='text-white'>Used by 5K+ Users Across the Globe</p>
                </div>
            </div>
            <h1 className='text-2xl md:text-4xl md:pb-2 font-bold bg-gradient-to-r from-white to-indigo-800 bg-clip-text text-transparent'>Stop guessing passwords.</h1>
            <p className='text-xl md:text-3xl font-bold text-indigo-400 text-center max-w-72 md:max-w-md'>Start storing them.</p>
           </div>
           <span className='md:h-10'></span>
        </div>

            <div className='flex-1 flex flex-col items-center justify-center p-6 sm:p-10'>
                    <SignIn />  
            </div>

    </div>
  )
}

export default Login
