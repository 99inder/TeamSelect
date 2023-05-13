import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slices/pageInfoSlice';
import { setVisibleUsers } from '../redux/slices/visibleUsersSlice';
import { usersAccordingToPage } from '../utilityFunctions/usersAccordingToPage';

const Pagination = () => {

  const dispatch = useDispatch();

  //getting state from the redux store
  const { currentPage, totalPages, usersPerPage } = useSelector(state => state.pageInfo);
  const { filteredData } = useSelector(state => state.filteredData);


  useEffect(() => {
    const requiredData = usersAccordingToPage(filteredData, currentPage, usersPerPage);

    dispatch(setVisibleUsers(requiredData));

    // eslint-disable-next-line
  }, [currentPage, filteredData, usersPerPage]);


  return (
    <div className='fixed bottom-0 left-0 w-full h-12 x-40 bg-teal-800'>
      <div className='flex h-full justify-around items-center'>
        <div>
          {
            currentPage > 1 && <button className='bg-white border-2 border-slate-300 rounded-lg py-1 px-3 mr-3' onClick={() => dispatch(setCurrentPage(currentPage - 1))}>Previous</button>
          }
          {
            currentPage < totalPages && <button className='bg-white border-2 border-slate-300 rounded-lg py-1 px-3' onClick={() => dispatch(setCurrentPage(currentPage + 1))}>Next</button>
          }
        </div>
        <div className='font-bold text-white'>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );

}

export default Pagination