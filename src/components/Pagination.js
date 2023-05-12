import React, { useEffect } from 'react'
import { mockData as data } from '../data/heliverse_mock_data'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slices/pageInfoSlice';
import { setVisibleUsers } from '../redux/slices/visibleUsersSlice';
import { usersAccordingToPage } from '../utilityFunctions/usersAccordingToPage';

const Pagination = () => {

  const dispatch = useDispatch();

  //getting state from the redux store
  const { currentPage, totalPages, usersPerPage } = useSelector(state => state.pageInfo);

  
  useEffect(() => {
    const requiredData = usersAccordingToPage(data, currentPage, usersPerPage);

    dispatch(setVisibleUsers(requiredData));

    // eslint-disable-next-line
  }, [currentPage, data, usersPerPage]);


  return (
    <div className='flex justify-between'>
      <div>
        {
          currentPage > 1 && <button className='bg-white border-2 border-slate-300 rounded-lg py-1 px-3 mr-3' onClick={() => dispatch(setCurrentPage(currentPage - 1))}>Previous</button>
        }
        {
          currentPage < totalPages && <button className='bg-white border-2 border-slate-300 rounded-lg py-1 px-3' onClick={() => dispatch(setCurrentPage(currentPage + 1))}>Next</button>

        }
      </div>
      <div className='font-bold'>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );

}

export default Pagination