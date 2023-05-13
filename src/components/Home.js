import Pagination from "./Pagination"
import Card from './Card'
import { useSelector } from 'react-redux'
import Filter from "./Filter"
import Spinner from "./Spinner"

const Home = () => {

    const visibleUsers = useSelector(state => state.visibleUsers.value)

    return (
        <div className='w-[70%] mx-auto mt-16 mb-12 h-full'>
            <Filter />
            <div className=' flex justify-center flex-wrap gap-4 h-full'>

                {
                    visibleUsers.length === 0
                        ?
                        <Spinner />
                        :

                        visibleUsers.map((item) => (
                            <Card key={item.id} user={item} />
                        ))
                }

            </div>
            <Pagination />
        </div>
    )
}

export default Home