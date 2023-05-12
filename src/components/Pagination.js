import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slices/currentPageSlice';
import { setVisibleUsers } from '../redux/slices/visibleUsersSlice';

const Pagination = ({ usersPerPage, data}) => {
  const dispatch = useDispatch();

  const currentPage = useSelector(state => state.currentPage.value);
  const totalPages = Math.ceil(data.length / usersPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    dispatch(setVisibleUsers(data.slice(startIndex, endIndex)));
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