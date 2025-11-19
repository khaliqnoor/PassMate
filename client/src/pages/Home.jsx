import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addPassword, updatePassword } from "../feature/password/passwordSlice";
import PasswordList from "../components/PasswordList";
import { useAuth } from "@clerk/clerk-react";
import { createApi } from "../api/axios.js";


const Home = () => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [editId, setEditId] = useState(null);
  const { getToken, userId } = useAuth();

  const dispatch = useDispatch();



  const handleAdd = async (e) => {
  e.preventDefault();

  if (url.length < 3 || password.length < 3) {
    return toast.error(
      <span style={{ fontWeight: "700" }}>
        Password and URL should be greater than 3
      </span>
    );
  }

  const payload = {
    url,
    username,
    password
  };

  const token = await getToken();
  const api = createApi(token, userId);

  try {
    let saved;

    if (editId) {
      // UPDATE REQUEST
      saved = await api.put(`/${editId}`, payload);

      dispatch(updatePassword(saved.data));   // Redux update
      toast.success(<span style={{ fontWeight: "700" }}>Password Updated!</span>);
      setEditId(null);
    } else {
      // CREATE REQUEST
      saved = await api.post("/passwords", payload);

      dispatch(addPassword(saved.data));       // Redux add
      toast.success(<span style={{ fontWeight: "700" }}>Password saved!</span>);
    }

  } catch (err) {
    console.error(err);
    toast.error("Backend error. Check your API logs.");
  }

  setUrl("");
  setUsername("");
  setPassword("");
};

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL..."
              className="w-full px-3 py-2 rounded-md bg-white/60 outline-none placeholder-gray-700"
            />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username..."
              className="w-full px-3 py-2 rounded-md bg-white/60 outline-none placeholder-gray-700"
            />

            <div className="relative">
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className="flex items-center text-xl cursor-pointer text-black justify-center gap-1  bg-green-500 hover:bg-green-600 font-semibold py-2 px-4 rounded-md transition-all duration-200 w-full md:w-1/2 mx-auto"
            >
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          </form>
        </div>

        <PasswordList
          setUrl={setUrl}
          setUsername={setUsername}
          setPassword={setPassword}
          setEditId={setEditId}
        />
      </div>
    </>
  );
};

export default Home;
