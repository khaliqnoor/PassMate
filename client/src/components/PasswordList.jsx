import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { dltPassword } from "../feature/password/passwordSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordList = ({ setUrl, setUsername, setPassword, setEditId }) => {
  const passwordList = useSelector((state) => state.passwords.passwords);
  const dispatch = useDispatch();
  const copyPassword = (pwd) => {
    navigator.clipboard.writeText(pwd);
    toast.success(<span style={{ fontWeight: "700" }}>Password Copied!</span>);
  };



  const handleEdit = (id) => {
    const item = passwordList.find((p) => p.id === id);
    setUrl(item.url);
    setUsername(item.username);
    setPassword(item.password);
    setEditId(item.id);
  };

  const [visibleId, setVisibleId] = useState(null);

  const deletePassword = (id) => {
    let result = confirm("Do you want to delete this password?");
    if (result) {
      dispatch(dltPassword(id));
      toast.success(
        <span style={{ fontWeight: "700" }}>
          Password deleted successfully!
        </span>
      );
    }
  };

  return (
    <>
      {passwordList.length !== 0 ? (
        <div className="md:w-1/2 w-full mt-10 overflow-x-auto">
          <div className="hidden sm:grid grid-cols-4 gap-2 text-green-500 font-semibold mb-2 px-2">
            <span className="truncate">URL</span>
            <span className="truncate">Username</span>
            <span className="truncate">Password</span>
          </div>

          {passwordList.map((i) => (
            <div
              key={i.id}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-white/20 p-3 rounded-md mb-2 shadow shadow-white"
            >
              <div className="min-w-0 truncate sm:truncate">
                <a
                  href={i.url}
                  target="_blank"
                  rel="noreferrer"
                  className="sr-only"
                >
                  Open URL
                </a>
                <span className="truncate block">{i.url}</span>
              </div>

              <div className="min-w-0 truncate sm:truncate">
                <span className="truncate block">{i.username}</span>
              </div>

              <div className="min-w-0 flex items-center gap-2 sm:gap-4">
                <span className="font-mono overflow-hidden truncate whitespace-nowrap block">
                  {visibleId === i.id
                    ? i.password
                    : "•".repeat(i.password.length)}
                </span>

                <button
                  className="flex-shrink-0 text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => copyPassword(i.password)}
                  aria-label="Copy password"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/xuoapdes.json"
                    trigger="hover"
                    style={{ width: "16px", height: "16px" }}
                  ></lord-icon>
                </button>

                <button
                  className="flex-shrink-0 text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() =>
                    setVisibleId(visibleId === i.id ? null : i.id)
                  }
                  aria-label={
                    visibleId === i.id ? "Hide password" : "Show password"
                  }
                >
                  {visibleId === i.id ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 sm:gap-2 justify-end sm:justify-start flex-shrink-0">
                <button
                  onClick={() => handleEdit(i.id)}
                  className="text-blue-500 cursor-pointer hover:text-blue-700 flex-shrink-0"
                  aria-label="Edit"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/vwzukuhn.json"
                    trigger="hover"
                    colors="primary:#000000,secondary:#ffffff,tertiary:#ffc738,quaternary:#2516c7"
                    style={{ width: "24px", height: "24px" }}
                  ></lord-icon>
                </button>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer flex-shrink-0"
                  onClick={() => deletePassword(i.id)}
                  aria-label="Delete"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/sxhqklqh.json"
                    trigger="hover"
                    colors="primary:#000000,secondary:#e83a30,tertiary:#646e78"
                    style={{ width: "24px", height: "24px" }}
                  ></lord-icon>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white/60 text-center font-bold mt-2">
          No Saved Passwords Yet
        </div>
      )}
    </>
  );
};

export default PasswordList;
