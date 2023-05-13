import React from 'react'
import { useSelector } from 'react-redux';
import Card from './Card';

const Team = () => {

    const team = useSelector(state => state.team.value);

    return (
        <div className='w-[70%] mx-auto max-custom:pt-28 h-auto min-h-screen flex flex-row items-center justify-center'>

            {
                team.length === 0
                    ?
                    <p className=' text-3xl text-bolder text-slate-600'>No User Selected</p>
                    :
                    <div className='flex flex-col items-center justify-center'>
                        <p className=' text-3xl font-extrabold text-slate-600 text-center'>Users Selected: {team.length} out of 3</p>

                        <div className='flex items-center justify-center gap-6 flex-wrap'>
                            {
                                team.map((item) => (
                                    <Card key={item.id} user={item} />
                                ))
                            }
                        </div>

                    </div>

            }

        </div>
    )
}

export default Team