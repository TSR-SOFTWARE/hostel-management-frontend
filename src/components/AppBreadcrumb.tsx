import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { capitalize } from '@utils/string.utils';

export const AppBreadcrumb = () => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      <Link component={RouterLink} to="/dashboard" underline="hover" color="inherit" variant="body2">
        Home
      </Link>
      {segments.map((seg, idx) => {
        const path = '/' + segments.slice(0, idx + 1).join('/');
        const isLast = idx === segments.length - 1;
        const label = capitalize(seg.replace(/-/g, ' '));
        return isLast ? (
          <Typography key={path} variant="body2" color="text.primary">
            {label}
          </Typography>
        ) : (
          <Link key={path} component={RouterLink} to={path} underline="hover" color="inherit" variant="body2">
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
