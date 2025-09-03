import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { counterContext } from '../../context/counterContext';
import { tokenContext } from '../../Context/tokenContext';

export default function Navbar() {

  let { count } = useContext(counterContext);
  let { token, setToken, userData } = useContext(tokenContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

  return (
    <div className='shadow-lg'>
      <div className="navbar bg-base-100 w-[90%] mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-sky-800 text-2xl">Linked Post</Link>
        </div>

        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={userData?.photo || "https://via.placeholder.com/40"} 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {token ? (
                <>
                  <li><span>{userData?.name}</span></li>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to={`/profile/${userData?._id}`}>Profile</NavLink></li>
                  <li><a onClick={logout}>Logout</a></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/login">Login</NavLink></li>
                  <li><NavLink to="/register">Register</NavLink></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
