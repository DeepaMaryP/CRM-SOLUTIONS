import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import userLogo from '../assets/userLogo.png'
import { logout } from '../redux/slice/authSlice'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
 const navigate = useNavigate()

  const handleLogout = () => {    
    navigate("/login", { replace: true })  // ✅ go straight to login
    dispatch(logout())
  }

  return (
    <div>
      {user && user.userName &&
        <div className='p-0 m-0 box-border grid grid-cols-3 sm:grid-cols-4  xl:grid-cols-5'>

          <div className='col-span-3 pl-3 grid grid-cols-3 md:grid-cols-5 gap-1 pt-5 sm:pt-0 sm:gap-x-9 text-orange-500 text-lg font-bold items-center'>

          </div>

          <div className='flex gap-3 col-span-4 lg:col-span-1 pr-5 mt-5 items-center justify-end'>
            <Link to='/login' >
              <div className='flex items-center gap-2'>
                <span className='font-medium text-md'>{user.userName}</span>
                <img src={userLogo} className='h-6 sm:h-9' alt="Login" />
                <button
                  onClick={handleLogout}
                  className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            </Link>
          </div>
        </div>}
    </div>
  )
}

export default Header
