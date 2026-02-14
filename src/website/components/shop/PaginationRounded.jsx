import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination boundaryCount={1} siblingCount={0} count={36} variant="outlined" shape="rounded" />
    </Stack>
  );
}
