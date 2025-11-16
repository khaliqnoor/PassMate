import React from 'react'
import toast from 'react-hot-toast';
import { useState } from 'react';
import { dltPassword } from '../feature/password/passwordSlice';
import { useDispatch, useSelector } from 'react-redux';
import {FaCopy, FaTrash, FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordList = ({setUrl, setUsername, setPassword, setEditId}) => {
    const passwordList = useSelector((state) => state.passwords.passwords);
    const dispatch = useDispatch()
      const copyPassword = (pwd) => {
        navigator.clipboard.writeText(pwd);
         toast.success("Password copied")
      };
 const handleEdit = (id) => {
    const item = passwordList.find((p) => p.id === id);
    setUrl(item.url);
    setUsername(item.username);
    setPassword(item.password);
    setEditId(id);
};

   const [visibleId, setVisibleId] = useState(null);


    const deletePassword = (id) => {
    dispatch(dltPassword(id))
    toast.success('Password deleted successfully')
  };

  return (
    <>
      
       {passwordList.length !== 0 ? (
        <div className="md:w-1/2 w-full mt-10 overflow-x-auto">
          <div className="grid grid-cols-4 gap-2 text-green-500 font-semibold mb-2 px-2">
            <span>URL</span>
            <span>Username</span>
            <span>Password</span>
            <span>Actions</span>
          </div>

          {passwordList.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-2 items-center bg-white/20 p-3 rounded-md mb-2 shadow shadow-white"
            >
              <span className="truncate">{item.url}</span>
              <span className="truncate">{item.username}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">
                  {visibleId === item.id ? item.password : '•'.repeat(item.password.length)}
                </span>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => copyPassword(item.password)}
                >
                  <FaCopy />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() =>
                    setVisibleId(visibleId === item.id ? null : item.id)
                  }
                >
                  {visibleId === item.id ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=> handleEdit(item.id)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deletePassword(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

      ) : ( <div className='text-white/60 text-center font-bold mt-2'>No Saved Passwords Yet</div> )}

    </>
  )
}

export default PasswordList
