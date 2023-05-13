import React, { useEffect, useState } from 'react'
import { mockData as data } from '../data/heliverse_mock_data'
import { getDomains, getGenders } from '../utilityFunctions/setFinder'
import { setVisibleUsers } from "../redux/slices/visibleUsersSlice"
import { useDispatch, useSelector } from 'react-redux'
import { usersAccordingToPage } from '../utilityFunctions/usersAccordingToPage'
import { setCurrentPage, setTotalPages } from '../redux/slices/pageInfoSlice'
import { BiMenuAltLeft } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import { setFilteredData } from '../redux/slices/filteredDataSlice'

const Filter = () => {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const { currentPage, usersPerPage } = useSelector(state => state.pageInfo);

    const [filters, setFilters] = useState(
        {
            "name": "",
            "gender": [],
            "availability": [],
            "domain": [],
        }
    )

    const filterHandler = (e) => {
        const { name, value, checked } = e.target;

        //filters state managing logic here
        // eslint-disable-next-line
        {
            //name filter logic
            if (name === "name") {
                setFilters((prev) => {
                    return {
                        ...prev,
                        name: value
                    }
                })
            }


            //gender filter logic
            if (name === "gender") {
                setFilters((prev) => {
                    return {
                        ...prev,
                        gender: checked
                            ? [...prev.gender, value]
                            : prev.gender.filter((val) => val !== value),
                    }
                })
            }

            //availability filter logic
            if (name === "availability") {
                setFilters((prev) => {
                    return {
                        ...prev,
                        availability: checked
                            ? [...prev.availability, value]
                            : prev.availability.filter((val) => val !== value),
                    }
                })
            }

            //domain filter logic
            if (name === "domain") {
                setFilters((prev) => {
                    return {
                        ...prev,
                        domain: checked
                            ? [...prev.domain, value]
                            : prev.domain.filter((val) => val !== value),
                    }
                })
            }
        }
    }

    useEffect(() => {
        const filteredUsers = data.filter(user => {
            const fullName = user.first_name.toLowerCase() + " " + user.last_name.toLowerCase();
            const nameIncludes = filters.name.length === 0 || fullName.includes(filters.name.toLowerCase());

            const genderMatches = filters.gender.length === 0 || filters.gender.includes(user.gender);
            const availabilityMatches = filters.availability.length === 0 || filters.availability.includes(user.available === true ? "available" : "unavailable");
            const domainMatches = filters.domain.length === 0 || filters.domain.includes(user.domain);

            return nameIncludes && genderMatches && availabilityMatches && domainMatches;
        });

        dispatch(setFilteredData(filteredUsers));
        const requiredData = usersAccordingToPage(filteredUsers, currentPage, usersPerPage);

        dispatch(setVisibleUsers(requiredData));
        dispatch(setTotalPages(Math.ceil(filteredUsers.length / usersPerPage)))
        dispatch(setCurrentPage(1));

        // eslint-disable-next-line
    }, [filters]);



    return (
        <>
            <div className="menu fixed left-4 z-30 text-3xl bg-black text-white rounded-full p-3 cursor-pointer max-sm:left-1" onClick={() => setIsOpen(!isOpen)}>
                {
                    !isOpen ?
                        <BiMenuAltLeft /> :
                        <AiOutlineClose />
                }
            </div>

            <div className={`fixed top-24 left-10 w-fit z-10 bg-white rounded-xl p-5 ${isOpen ? '' : 'hidden'}`}>
                {/* Filter by Name */}
                <div className=' w-full'>
                    <input className='w-full h-10 px-4 border border-slate-400 rounded-xl' type="text" name="name" value={filters.name} placeholder='Search Name' onChange={filterHandler} />
                </div>

                {/* Genders Filter List */}
                <div className='mt-2'>
                    <p className='text-lg font-semibold mb-1'>Gender:</p>
                    <div className='flex flex-wrap gap-2'>
                        {
                            getGenders(data).map((gender, index) => {
                                return (
                                    <div key={index}>

                                        <input type="checkbox" name="gender" value={gender} id={gender} className="peer hidden" onChange={filterHandler} />
                                        <label htmlFor={gender} className="select-none cursor-pointer rounded-lg border-2 border-teal-800
   py-1 px-1 font-bold text-zinc-800 transition-colors duration-200 ease-in-out peer-checked:bg-teal-800 peer-checked:text-slate-50 peer-checked:border-black ">{gender}
                                        </label>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>

                <hr />

                {/* Availability Filter List */}
                <div className='mt-2'>
                    <p className='text-lg font-semibold mb-1'>Availability:</p>
                    <div className="flex flex-wrap gap-2">

                        <div>
                            <input type="checkbox" name="availability" value="available" id='available' className="peer hidden" onChange={filterHandler} />
                            <label htmlFor="available" className="select-none cursor-pointer rounded-lg border-2 border-teal-800
   py-1 px-1 font-bold text-zinc-800 transition-colors duration-200 ease-in-out peer-checked:bg-teal-800 peer-checked:text-slate-50 peer-checked:border-black ">Available</label>
                        </div>

                        <div>
                            <input type="checkbox" name="availability" value="unavailable" id='unavailable' className="peer hidden" onChange={filterHandler} />
                            <label htmlFor="unavailable" className="select-none cursor-pointer rounded-lg border-2 border-teal-800
   py-1 px-1 font-bold text-zinc-800 transition-colors duration-200 ease-in-out peer-checked:bg-teal-800 peer-checked:text-slate-50 peer-checked:border-black ">Un-available</label>
                        </div>
                    </div>
                </div>

                <hr />

                {/* Domains Filter List */}
                <div className='mt-2'>
                    <p className='text-lg font-semibold mb-1'>Domain:</p>
                    <div className='flex flex-wrap gap-2'>
                        {
                            getDomains(data).map((domainName, index) => {
                                return (
                                    <div key={index}>

                                        <input type="checkbox" name="domain" value={domainName} id={domainName} className="peer hidden" onChange={filterHandler} />
                                        <label htmlFor={domainName} className="select-none cursor-pointer rounded-lg border-2 border-teal-800
   py-1 px-1 font-bold text-zinc-800 transition-colors duration-200 ease-in-out peer-checked:bg-teal-800 peer-checked:text-slate-50 peer-checked:border-black ">{domainName}
                                        </label>
                                    </div>

                                )
                            })
                        }
                    </div>

                </div>

            </div>
        </>
    )
}

export default Filter