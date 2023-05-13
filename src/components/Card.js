import React from 'react'
import { TiUserAdd } from 'react-icons/ti';
import { FaUserSlash } from 'react-icons/fa';
import { BsGenderAmbiguous, BsFillMoonStarsFill, BsSun } from 'react-icons/bs';
import { MdDomain, MdMailOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setTeam } from '../redux/slices/teamSlice';
import { toast } from 'react-toastify';

const Card = ({ user }) => {

    const team = useSelector(state => state.team.value)
    const dispatch = useDispatch();

    // Add to team logic here
    const addToTeam = () => {

        if (team.length >= 3) {
            //send toast
            toast.error('Team is full!');
        }
        //team as less than 3 members
        else {
            //domain already exists in team
            if (team.some(member => member.domain === user.domain)) {
                //send toast
                toast.warning(`User with domain: ${user.domain} already exists!`)
            }

            else {
                //add to team
                const currTeam = [...team, user];
                dispatch(setTeam(currTeam));

                //Success toast
                toast.success("User added to team");
            }
        }
    }

    //Remove from team logic here
    const removeFromTeam = () => {
        const currTeam = team.filter(member => member.id !== user.id);
        dispatch(setTeam(currTeam));

        toast.success("User removed.")
    }


    return (
        <div className={`max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4 w-[23%] min-w-[250px] relative ${!user.available && "opacity-75"} group`}>
            <div className='h-[100px] flex justify-center items-center w-full'>
                <img className="w-[20%] p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={user.avatar} alt="Bordered avatar" />
            </div>
            <div className="flex items-center px-6 py-3 bg-gray-900">
                {
                    user.available ?
                        <BsSun className=' text-2xl text-amber-400 text-extrabold' /> :
                        <BsFillMoonStarsFill className=' text-2xl text-white' />
                }
                <h1 className="mx-3 text-white font-semibold text-lg">{user.available ? "Available" : "Unavailable"}</h1>
            </div>
            <div className="py-4 px-6">
                <h1 className="text-2xl font-semibold text-gray-800">{`${user.first_name} ${user.last_name}`}</h1>
                <div className="flex items-center mt-4 text-gray-700">
                    <BsGenderAmbiguous className=' text-2xl' />
                    <h1 className="px-2 text-sm">{user.gender}</h1>
                </div>
                <div className="flex items-center mt-4 text-gray-700">
                    <MdDomain className=' text-2xl' />
                    <h1 className="px-2 text-sm">{user.domain}</h1>
                </div>
                <div className="flex items-center mt-4 text-gray-700">
                    <MdMailOutline className='text-2xl' />
                    <a href={`mailto:${user.email}`} className="px-2 text-sm">{user.email}</a>
                </div>
            </div>

            {/* Add to team button */}
            <div className={` text-4xl absolute bottom-0 right-0 bg-slate-200 rounded-tl-lg overflow-hidden`}>
                {
                    user.available ?
                        (
                            team.some(member => member.id === user.id) ?
                                <FaUserSlash className="text-red-600 cursor-pointer group-hover:text-slate-200 group-hover:bg-red-600 w-full h-full"  onClick={removeFromTeam} />
                                :
                                < TiUserAdd className="text-green-600 cursor-pointer group-hover:text-slate-200 group-hover:bg-green-600" onClick={addToTeam} />
                        ) :
                        <></>
                }
            </div>
        </div>
    )
}

export default Card