import { Pagination, PaginationItem} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPaginatedTasks } from '../services/actions/tasks';

export default function CustomPagination({page}) {
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector((state)=> state.tasks)

  useEffect(()=>{
    if(page)dispatch(fetchPaginatedTasks(page))
  },[page])
  
  return (
      <Pagination 
        
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined" 
        shape="rounded"
        color ="primary"
        renderItem={(item)=> (
          <PaginationItem {...item} component={Link} to={`/explore?page=${item.page}`}/>
        )} 
       />
  );
}