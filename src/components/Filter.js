import React, { useEffect, useState } from 'react'
import { mockData as data } from '../data/heliverse_mock_data'
import { getDomains, getGenders } from '../utilityFunctions/setFinder'
import { setVisibleUsers } from "../redux/slices/visibleUsersSlice"
import { useDispatch, useSelector } from 'react-redux'
import { usersAccordingToPage } from '../utilityFunctions/usersAccordingToPage'
import { setTotalPages } from '../redux/slices/pageInfoSlice'

const Filter = () => {

    const dispatch = useDispatch();

    const { currentPage, usersPerPage } = useSelector(state => state.pageInfo);

    const [filters, setFilters] = useState(
        {
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
            const genderMatches = filters.gender.length === 0 || filters.gender.includes(user.gender);
            const availabilityMatches = filters.availability.length === 0 || filters.availability.includes(user.available === true ? "available" : "unavailable");
            const domainMatches = filters.domain.length === 0 || filters.domain.includes(user.domain);

            return genderMatches && availabilityMatches && domainMatches;
        });

        const requiredData = usersAccordingToPage(filteredUsers, currentPage, usersPerPage);
        dispatch(setVisibleUsers(requiredData));
        dispatch(setTotalPages(Math.ceil(filteredUsers.length / usersPerPage)))

        // eslint-disable-next-line
    }, [filters]);



    return (
        <div>
            {/* Genders Filter List */}
            <div>
                <p>Gender:</p>
                {
                    getGenders(data).map((gender, index) => {
                        return (
                            <label key={index} htmlFor={gender}>{gender}
                                <input type="checkbox" name="gender" value={gender} id={gender} onChange={filterHandler} />
                            </label>
                        )
                    })
                }
                {/* <label htmlFor="male">Male</label>
                <input type="checkbox" name="gender" value="male" id='male' onChange={filterHandler} />

                <label htmlFor="female">Female</label>
                <input type="checkbox" name="gender" value="female" id='female' onChange={filterHandler} /> */}
            </div>

            <hr />

            {/* Availability Filter List */}
            <div>
                <p>Availability:</p>
                <label htmlFor="available">Available</label>
                <input type="checkbox" name="availability" value="available" id='available' onChange={filterHandler} />

                <label htmlFor="unavailable">Un-available</label>
                <input type="checkbox" name="availability" value="unavailable" id="unavailable" onChange={filterHandler} />
            </div>

            <hr />

            {/* Domains Filter List */}
            <div>
                <p>Domain:</p>
                {
                    getDomains(data).map((domainName, index) => {
                        return (
                            <label key={index} htmlFor={domainName}>{domainName}
                                <input type="checkbox" name="domain" value={domainName} id={domainName} onChange={filterHandler} />
                            </label>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Filter