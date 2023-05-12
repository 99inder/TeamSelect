import React, { useEffect, useState } from 'react'
import { mockData as data } from '../data/heliverse_mock_data'
import { uniqueDomainsFinder } from '../utilityFunctions/uniqueDomainsFinder'
import { setVisibleUsers } from "../redux/slices/visibleUsersSlice"
import { useDispatch, useSelector } from 'react-redux'
import { usersAccordingToPage } from '../utilityFunctions/usersAccordingToPage'

const Filter = ({ usersPerPage }) => {

    const dispatch = useDispatch();

    const currentPage = useSelector(state => state.currentPage.value);

    const [filters, setFilters] = useState(
        {
            "gender": [],
            "availability": [],
            "domain": [],
        }
    )

    const filterHandler = (e) => {
        const { name, value, checked, type } = e.target;

        //filters state managing logic here
        // eslint-disable-next-line
        {

            //gender filter logic
            if (name === "gender") {
                if (type === "checkbox" && checked === true) {
                    setFilters(prev => {
                        return {
                            ...prev,
                            gender: [...prev.gender, value]
                        }
                    })
                }

                else {
                    setFilters(prev => {
                        return {
                            ...prev,
                            gender: prev.gender.filter(item => item !== value)
                        }
                    })
                }
            }

            //availability filter logic
            if (name === "availability") {
                if (type === "checkbox" && checked === true) {
                    setFilters(prev => {
                        return {
                            ...prev,
                            availability: [...prev.availability, value]
                        }
                    })
                }

                else {
                    setFilters(prev => {
                        return {
                            ...prev,
                            availability: prev.availability.filter(item => item !== value)
                        }
                    })
                }
            }

            //domain filter logic
            if (name === "domain") {
                if (type === "checkbox" && checked === true) {
                    setFilters(prev => {
                        return {
                            ...prev,
                            domain: [...prev.domain, value]
                        }
                    })
                }

                else {
                    setFilters(prev => {
                        return {
                            ...prev,
                            domain: prev.domain.filter(item => item !== value)
                        }
                    })
                }
            }

        }
    }

    useEffect(() => {
        const filteredUsers = data.filter(user => {
            const genderMatches = filters.gender.length === 0 || filters.gender.includes(user.gender.toLowerCase());
            const availabilityMatches = filters.availability.length === 0 || filters.availability.includes(user.available === true ? "available" : "unavailable");
            const domainMatches = filters.domain.length === 0 || filters.domain.includes(user.domain);

            return genderMatches && availabilityMatches && domainMatches;
        });

        const requiredData = usersAccordingToPage(filteredUsers, currentPage, usersPerPage);
        dispatch(setVisibleUsers(requiredData));

        // eslint-disable-next-line
    }, [filters]);



    return (
        <div>
            <div>
                <p>Gender:</p>
                <label htmlFor="male">Male</label>
                <input type="checkbox" name="gender" value="male" id='male' onChange={filterHandler} />

                <label htmlFor="female">Female</label>
                <input type="checkbox" name="gender" value="female" id='female' onChange={filterHandler} />
            </div>

            <hr />

            <div>
                <p>Availability:</p>
                <label htmlFor="available">Available</label>
                <input type="checkbox" name="availability" value="available" id='available' onChange={filterHandler} />

                <label htmlFor="unavailable">Un-available</label>
                <input type="checkbox" name="availability" value="unavailable" id="unavailable" onChange={filterHandler} />
            </div>

            <hr />

            <div>
                <p>Domain:</p>
                {
                    uniqueDomainsFinder(data).map((domainName, index) => {
                        return (
                            <>
                                <label htmlFor={domainName}>{domainName}
                                    <input type="checkbox" name="domain" value={domainName} id={domainName} onChange={filterHandler} />
                                </label>
                                <br />
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Filter