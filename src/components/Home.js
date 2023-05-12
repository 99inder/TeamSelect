import Pagination from "./Pagination"
import Card from './Card'
import { useSelector } from 'react-redux'
import Filter from "./Filter"
import { useEffect } from "react"

const Home = () => {

    const usersPerPage = 10;

    const visibleUsers = useSelector(state => state.visibleUsers.value)

    useEffect(() => {
      
    }, [visibleUsers])
    

    return (
        <div className='w-[70%] mx-auto'>
            <Pagination usersPerPage={usersPerPage}/>
            <Filter usersPerPage={usersPerPage}/>
            <div className=' flex justify-center flex-wrap gap-4'>

                {
                    visibleUsers.length === 0
                        ?
                        <div>No data</div>
                        :

                        visibleUsers.map((item) => (
                            <Card key={item.id} user={item} />
                        ))
                }

            </div>
        </div>
    )
}

export default Home