import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import toast, {Toaster} from 'react-hot-toast'
import { FaEye, FaEyeSlash, FaSave} from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { addPassword, updatePassword } from '../feature/password/passwordSlice';
import PasswordList from '../components/PasswordList';


const Home = () => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [editId, setEditId] = useState(null)

 const dispatch = useDispatch()


const handleAdd = (e) => {
  e.preventDefault();

  if (!url || !password) {
    return toast.error("Password and URL are required");
  }
  const payload = { id: editId || Date.now(), url, username, password };

  if (editId) {
    dispatch(updatePassword(payload));
    toast.success("Password updated!");
    setEditId(null);
  } else {
    dispatch(addPassword(payload));
    toast.success("Password saved!");
  }
 console.log("hello world")
  setUrl('');
  setUsername('');
  setPassword('');
};




  return (
    <>
    <Toaster position='top-center' reverseOrder={false} />
      <Navbar />
      <div className="flex flex-col items-center px-2">
        {/* Form */}
        <div className="md:w-1/2 w-full min-h-[50vh] bg-white/20 mt-24 rounded-md shadow shadow-white p-6">
          <h1 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-500 to-indigo-400 text-transparent bg-clip-text">
            Your Own Password Manager
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleAdd}>
            <input
              type="text"
              value={url}
              onChange={(e)=> setUrl(e.target.value)}
              placeholder="Enter URL..."
              className="w-full px-3 py-2 rounded-md bg-white/60 outline-none placeholder-gray-700"
            />

            <input
              type="text"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              placeholder="Enter Username..."
              className="w-full px-3 py-2 rounded-md bg-white/60 outline-none placeholder-gray-700"
            />

            <div className="relative">
              <input
                id="password"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Password..."
                className="w-full px-3 py-2 rounded-md bg-white/60 outline-none placeholder-gray-700"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center cursor-pointer justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 w-full md:w-1/2 mx-auto"
            >
              <FaSave /> Save
            </button>
          </form>
        </div>

       <PasswordList setUrl={setUrl} setUsername={setUsername} setPassword={setPassword} setEditId={setEditId} />

      </div>
    </>
  );
};

export default Home;
