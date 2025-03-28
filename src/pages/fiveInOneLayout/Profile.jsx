import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import Input from './Input';
import ProfileForm from './ProfileForm';
import { useFirebase } from '../../firebase/FirebaseContext';
import toast,{Toaster} from 'react-hot-toast';
import { useAppwrite } from '../../appwrite/AppwriteContext';
const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isModelShow, setIsModelShow] = useState(false);
  // const {isLoggedIn,signout} = useFirebase()
  const {loggedInUser,logout} = useAppwrite()
  const navigate = useNavigate()
  const getUserDetails = () => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsedata = JSON.parse(data);
      setUserData(parsedata);
      setLoading(false);
    }
    else {
      setUserData(null);
      setLoading(false);
    }
  }
  useEffect(() => {
    getUserDetails()
  }, [])
  const handleSignOut = () => {
    const res = confirm("Confirm logout?");
    if (!res) {
        toast.error("Logout canceled");
        return;
    }

    const logoutPromise = logout();

    toast.promise(logoutPromise, {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: (error) => error.message || "Logout failed",
    });
};

  if(loading){
    return (
      <>
          <div className='p-5 sm:p-20 w-full '>
            <div className='h-7 w-40 bg-slate-200 rounded-lg animate-pulse'></div>
            <div className='w-full  mt-10 '>
              <div className='flex flex-col sm:flex-row gap-5 sm:gap-20 justify-start items-start'>
                <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
                <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
              </div>
              <div className='flex flex-col sm:flex-row gap-5 sm:gap-20 justify-start items-start mt-7'>
                <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
                <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
              </div>
              <div className='flex flex-col sm:flex-row gap-5 sm:gap-20 justify-start items-start mt-7'>
                <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
                <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
              </div>
            </div>
            <div className='h-12 w-32 mt-14 bg-slate-200 rounded-lg animate-pulse'></div>
          </div>
        </>
    )
  }
  return (
    <>
      {
       loggedInUser?<>
          <div className="w-full sm:w-[85%] px-5 py-10 sm:p-14 h-auto">
          <div className='flex justify-between items-start w-full'>
          <div>
           <h1 className='text-2xl font-semibold'>My Profile</h1>
            <p className='text-slate-400 text-xs my-3'>You can edit/update your profile information by click on edit profile button.</p>
           </div>
          { loggedInUser?<button className='w-40 mt-5 p-1 border bg-slate-800  duration-500 border-slate-800 text-white flex justify-center items-center ' onClick={handleSignOut}> SignOut
           </button>:<button className='w-40 mt-5 p-1 border bg-slate-800  duration-500 border-slate-800 text-white flex justify-center items-center mx-5 sm:mx-0' onClick={()=>navigate("/login")}>Login
           </button>}
          </div>
            {
              loggedInUser ? <div className='w-full sm:w-[70%] sm:my-5'>
                <div>
                  <div className='flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center'>
                    <div className='relative w-full sm:w-1/2 text-start' >
                      <p className='text-xs text-slate-400 font-semibold'>FULL NAME</p>
                      <h1 className="sm:text-xl text-lg">{loggedInUser?.name}</h1>

                    </div>
                    <div className='relative w-full sm:w-1/2 text-start'>
                      <p className='text-xs text-slate-400 font-semibold'>Email</p>
                      <h1 className="sm:text-xl text-lg">{loggedInUser?.email}</h1>

                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center'>
                    <div className='relative  w-full sm:w-1/2 text-start' >
                      <p className='text-xs text-slate-400 font-semibold'>PHONE NUMBER</p>
                      <h1 className="sm:text-xl text-lg">{loggedInUser?.phone || "not provided"}</h1>
                    </div>
                  
                  </div>
                
                  <button className='w-40 mt-5 p-1 border bg-slate-800  duration-500 border-slate-800 text-white flex justify-center items-center ' onClick={()=>setIsModelShow(true)}> Edit
                  </button>
                </div>

              </div> : 
              <div className='w-full sm:h-full h-[50vh] flex justify-center items-center'>
                <div className='h-10 w-40 gap-1 bg-slate-800 cursor-pointer flex justify-center items-center font-bold text-white rounded-md'  onClick={()=>setIsModelShow(true)}><FaCirclePlus className='mb-[2px]'/>ADD YOUR INFO</div>
              </div>
            }
              <ProfileForm
                  isModelShow={isModelShow}
                  setIsModelShow={setIsModelShow}
                  fullName={userData?.fullName}
                  gender={userData?.gender}
                  dob={userData?.dob}
                  altNumber={userData?.altNumber}
                  phoneNumber={userData?.phoneNumber}
                  email={userData?.email}
                  getUserDetails={getUserDetails}
                />
          </div>
        </>:<div className='h-[25rem] w-full flex flex-col justify-center items-center'>
          <h1 className='text-xl text-zinc-700 font-semibold'>Please login first</h1>
        <button className='w-40 mt-5 p-1 border bg-slate-800  duration-500 border-slate-800 text-white flex justify-center items-center mx-5 sm:mx-0' onClick={()=>navigate("/login")}>Login
        </button>
        </div>
      }
    </>
  );
};

export default Profile;
