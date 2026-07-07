import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack, Typography, Divider, FormGroup, FormControlLabel,
  Checkbox, Paper, Grid, Chip,
} from '@mui/material';
import { useListRolesQuery, useListPermissionsQuery } from '@api/usersApi';
import { useGetRolePermissionsQuery, useSetRolePermissionsMutation } from '@api/adminApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppButton } from '@components/AppButton';
import { AppLoader } from '@components/AppLoader';
import { AppErrorState } from '@components/AppErrorState';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { getErrorMessage } from '@utils/error.utils';

export default function RoleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbarContext();

  const { data: roles = [], isLoading: rolesLoading } = useListRolesQuery();
  const { data: allPermissions = [], isLoading: permsLoading } = useListPermissionsQuery();
  const { data: rolePerms, isLoading: rolePermsLoading } = useGetRolePermissionsQuery(id!);
  const [setRolePermissions, { isLoading: isSaving }] = useSetRolePermissionsMutation();

  const role = roles.find((r) => r.id === id);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (rolePerms) {
      setSelected(new Set(rolePerms.permission_ids));
      setIsDirty(false);
    }
  }, [rolePerms]);

  const permsByModule = useMemo(() => {
    const map: Record<string, typeof allPermissions> = {};
    for (const p of allPermissions) {
      if (!map[p.module]) map[p.module] = [];
      map[p.module].push(p);
    }
    return map;
  }, [allPermissions]);

  const toggle = (permId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(permId) ? next.delete(permId) : next.add(permId);
      return next;
    });
    setIsDirty(true);
  };

  const toggleModule = (modulePerms: typeof allPermissions) => {
    const ids = modulePerms.map((p) => p.id);
    const allChecked = ids.every((id) => selected.has(id));
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => {
       if (allChecked) {
        next.delete(id);
        } else {
         next.add(id);
        }
      });
      return next;
    });
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      await setRolePermissions({ id: id!, permission_ids: Array.from(selected) }).unwrap();
      showSuccess('Permissions saved');
      setIsDirty(false);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const isLoading = rolesLoading || permsLoading || rolePermsLoading;
  if (isLoading) return <AppLoader fullPage />;
  if (!role) return <AppErrorState error="Role not found" onRetry={() => navigate(ROUTE_PATHS.ROLES)} />;

  return (
    <Stack spacing={3}>
      <AppPageHeader
        title={role.role_name}
        subtitle={role.description || 'Manage permissions for this role'}
        actions={
          <Stack direction="row" spacing={1}>
            {role.is_system_role && <Chip label="System Role" color="primary" variant="outlined" size="small" />}
            <AppButton variant="outlined" onClick={() => navigate(ROUTE_PATHS.ROLES)}>Back</AppButton>
            <AppButton variant="contained" loading={isSaving} disabled={!isDirty} onClick={handleSave}>
              Save Permissions
            </AppButton>
          </Stack>
        }
      />

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Permissions</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {Object.entries(permsByModule).map(([module, perms]) => {
            const allChecked = perms.every((p) => selected.has(p.id));
            const someChecked = perms.some((p) => selected.has(p.id));
            return (
              <Grid key={module} size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={0.5}>
                  <FormControlLabel
                    label={<Typography variant="subtitle2" fontWeight={600}>{module}</Typography>}
                    control={
                      <Checkbox
                        checked={allChecked}
                        indeterminate={someChecked && !allChecked}
                        onChange={() => toggleModule(perms)}
                        size="small"
                      />
                    }
                  />
                  <FormGroup sx={{ pl: 2 }}>
                    {perms.map((p) => (
                      <FormControlLabel
                        key={p.id}
                        label={<Typography variant="body2">{p.action}</Typography>}
                        control={
                          <Checkbox
                            checked={selected.has(p.id)}
                            onChange={() => toggle(p.id)}
                            size="small"
                          />
                        }
                      />
                    ))}
                  </FormGroup>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Stack>
  );
}
