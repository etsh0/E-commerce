import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useFilterStore } from '../../../store';

export default function PaginationRounded({pageCount}) {
  const handleChange = (e,value) => {
    setPage(value)
    window.scrollTo(0, 0);
  }

  const {page, setPage} = useFilterStore()

  return (
    <Stack spacing={2}>
      <Pagination 
      boundaryCount={1} 
      siblingCount={0} 
      count={pageCount} 
      page={page}
      onChange={handleChange}
      variant="outlined" 
      shape="rounded" 
      sx={{
        "& .MuiPaginationItem-root": {
          minWidth: { xs: '26px', sm: '32px' },
          height: { xs: '26px', sm: '32px' },
        }
      }}  
      />
    
    </Stack>
  );
}
