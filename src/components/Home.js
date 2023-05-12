import { mockData } from '../data/heliverse_mock_data'
import Pagination from "./Pagination"
import Card from './Card'
import { useSelector } from 'react-redux'

const Home = () => {

    const visibleUsers = useSelector(state => state.visibleUsers.value)

    return (
        <div className='w-[70%] mx-auto'>
            <Pagination usersPerPage={10} data={mockData}/>
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