import { Box, Pagination, Typography, Stack } from '@mui/material';

interface AppPaginationProps {
  total: number;
  page: number;
  limit: number;
  onChange: (page: number) => void;
}

export const AppPagination = ({ total, page, limit, onChange }: AppPaginationProps) => {
  const count = Math.ceil(total / limit);
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} py={1.5}>
      <Typography variant="body2" color="text.secondary">
        Showing {from}–{to} of {total}
      </Typography>
      <Box>
        <Pagination
          count={count}
          page={page}
          onChange={(_e, p) => onChange(p)}
          shape="rounded"
          size="small"
          color="primary"
        />
      </Box>
    </Stack>
  );
};
