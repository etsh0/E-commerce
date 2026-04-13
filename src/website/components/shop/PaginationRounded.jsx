import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useFilterStore } from '../../../store';
import { useLenis } from '../../../providers/LenisProvider';

export default function PaginationRounded({pageCount}) {

  const lenisRef = useLenis()

  const handleChange = (e,value) => {
    setPage(value)
    lenisRef.current?.scrollTo(0, { immediate: false })
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
