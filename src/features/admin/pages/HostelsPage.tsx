import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Chip, Tooltip, IconButton } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useListHostelsQuery, useCreateHostelMutation, useDeleteHostelMutation } from '@api/adminApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { useConfirm } from '@hooks/useConfirm';
import { AppTable } from '@components/AppTable';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppButton } from '@components/AppButton';
import { AppDialog } from '@components/AppDialog';
import { AppTextField } from '@components/AppTextField';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { createHostelSchema, type CreateHostelFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';
import type { HostelType } from '@appTypes/common.types';

const PAGE_SIZE = 10;

export default function HostelsPage() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { showSuccess, showError } = useSnackbarContext();
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isFetching } = useListHostelsQuery({ page: page + 1, limit: PAGE_SIZE });
  const [createHostel, { isLoading: isCreating }] = useCreateHostelMutation();
  const [deleteHostel, { isLoading: isDeleting }] = useDeleteHostelMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateHostelFormValues>({
    resolver: zodResolver(createHostelSchema),
  });

  const onSubmit = async (values: CreateHostelFormValues) => {
    try {
      await createHostel(values).unwrap();
      showSuccess('Hostel created');
      reset();
      setDialogOpen(false);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const handleDelete = async (hostel: HostelType) => {
    const ok = await confirm({ title: 'Delete Hostel', message: `Delete "${hostel.name}"? This cannot be undone.`, confirmLabel: 'Delete', confirmColor: 'error' });
    if (!ok) return;
    try {
      await deleteHostel(hostel.id).unwrap();
      showSuccess('Hostel deleted');
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const columns: GridColDef<HostelType>[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'total_rooms', headerName: 'Rooms', width: 90 },
    {
      field: 'is_active', headerName: 'Status', width: 110,
      renderCell: ({ value }) => <Chip label={value ? 'Active' : 'Inactive'} size="small" color={value ? 'success' : 'default'} variant="outlined" />,
    },
    {
      field: 'actions', headerName: '', width: 100, sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(ROUTE_PATHS.HOSTEL_DETAIL(row.id))}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" disabled={isDeleting} onClick={() => handleDelete(row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <AppPageHeader
        title="Hostels"
        subtitle="Manage all hostels in the system."
        actions={
          <AppButton variant="contained" icon={<AddIcon />} onClick={() => setDialogOpen(true)}>
            Add Hostel
          </AppButton>
        }
      />

      <AppTable
        rows={data?.hostels ?? []}
        columns={columns}
        loading={isFetching}
        rowCount={data?.total ?? 0}
        paginationMode="server"
        paginationModel={{ page, pageSize: PAGE_SIZE }}
        onPaginationModelChange={(m) => setPage(m.page)}
      />

      <AppDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); reset(); }}
        title="Add Hostel"
        maxWidth="sm"
        actions={
          <>
            <AppButton variant="outlined" onClick={() => { setDialogOpen(false); reset(); }}>Cancel</AppButton>
            <AppButton variant="contained" loading={isCreating} onClick={handleSubmit(onSubmit)}>Create</AppButton>
          </>
        }
      >
        <Stack spacing={2} pt={1}>
          <AppTextField label="Hostel Name" autoFocus error={!!errors.name} helperText={errors.name?.message} {...register('name')} />
          <AppTextField label="Address" error={!!errors.address} helperText={errors.address?.message} {...register('address')} />
          <Stack direction="row" spacing={2}>
            <AppTextField label="City" error={!!errors.city} helperText={errors.city?.message} {...register('city')} />
            <AppTextField label="State" error={!!errors.state} helperText={errors.state?.message} {...register('state')} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <AppTextField label="Pincode" error={!!errors.pincode} helperText={errors.pincode?.message} {...register('pincode')} />
            <AppTextField label="Total Rooms" type="number" error={!!errors.total_rooms} helperText={errors.total_rooms?.message} {...register('total_rooms')} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <AppTextField label="Phone" error={!!errors.phone} helperText={errors.phone?.message} {...register('phone')} />
            <AppTextField label="Email" type="email" error={!!errors.email} helperText={errors.email?.message} {...register('email')} />
          </Stack>
        </Stack>
      </AppDialog>
    </Stack>
  );
}
