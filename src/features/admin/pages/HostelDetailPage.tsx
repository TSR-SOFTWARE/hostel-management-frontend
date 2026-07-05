import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Grid, Paper, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetHostelQuery, useUpdateHostelMutation, useDeleteHostelMutation } from '@api/adminApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { useConfirm } from '@hooks/useConfirm';
import { AppTextField } from '@components/AppTextField';
import { AppButton } from '@components/AppButton';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppLoader } from '@components/AppLoader';
import { AppErrorState } from '@components/AppErrorState';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { createHostelSchema, type CreateHostelFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

export default function HostelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { showSuccess, showError } = useSnackbarContext();

  const { data: hostel, isLoading, isError } = useGetHostelQuery(id!);
  const [updateHostel, { isLoading: isUpdating }] = useUpdateHostelMutation();
  const [deleteHostel, { isLoading: isDeleting }] = useDeleteHostelMutation();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<CreateHostelFormValues>({
    resolver: zodResolver(createHostelSchema),
  });

  useEffect(() => {
    if (hostel) {
      reset({
        name: hostel.name,
        address: hostel.address,
        city: hostel.city,
        state: hostel.state,
        pincode: hostel.pincode,
        phone: hostel.phone ?? '',
        email: hostel.email ?? '',
        total_rooms: hostel.total_rooms,
      });
    }
  }, [hostel, reset]);

  const onSubmit = async (values: CreateHostelFormValues) => {
    try {
      await updateHostel({ id: id!, body: values }).unwrap();
      showSuccess('Hostel updated');
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    const ok = await confirm({ title: 'Delete Hostel', message: `Delete "${hostel?.name}"?`, confirmLabel: 'Delete', confirmColor: 'error' });
    if (!ok) return;
    try {
      await deleteHostel(id!).unwrap();
      showSuccess('Hostel deleted');
      navigate(ROUTE_PATHS.HOSTELS);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  if (isLoading) return <AppLoader fullPage />;
  if (isError || !hostel) return <AppErrorState error="Hostel not found" onRetry={() => navigate(ROUTE_PATHS.HOSTELS)} />;

  return (
    <Stack spacing={3}>
      <AppPageHeader
        title={hostel.name}
        subtitle={`${hostel.city}, ${hostel.state}`}
        actions={
          <AppButton variant="outlined" color="error" loading={isDeleting} onClick={handleDelete}>
            Delete Hostel
          </AppButton>
        }
      />

      <Paper variant="outlined" sx={{ p: 3, maxWidth: 640 }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <AppTextField label="Hostel Name" error={!!errors.name} helperText={errors.name?.message} {...register('name')} />
          <AppTextField label="Address" error={!!errors.address} helperText={errors.address?.message} {...register('address')} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField label="City" error={!!errors.city} helperText={errors.city?.message} {...register('city')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField label="State" error={!!errors.state} helperText={errors.state?.message} {...register('state')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField label="Pincode" error={!!errors.pincode} helperText={errors.pincode?.message} {...register('pincode')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField label="Total Rooms" type="number" error={!!errors.total_rooms} helperText={errors.total_rooms?.message} {...register('total_rooms')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField label="Phone" error={!!errors.phone} helperText={errors.phone?.message} {...register('phone')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField label="Email" type="email" error={!!errors.email} helperText={errors.email?.message} {...register('email')} />
            </Grid>
          </Grid>

          <Divider />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <AppButton variant="outlined" onClick={() => reset()}>Discard</AppButton>
            <AppButton type="submit" variant="contained" loading={isUpdating} disabled={!isDirty}>
              Save Changes
            </AppButton>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
