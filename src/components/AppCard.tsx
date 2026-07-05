import { Card, CardContent, CardHeader, type CardProps } from '@mui/material';
import type { ReactNode } from 'react';

interface AppCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
}

export const AppCard = ({ title, subtitle, action, children, noPadding = false, ...props }: AppCardProps) => (
  <Card {...props}>
    {title && <CardHeader title={title} subheader={subtitle} action={action} />}
    <CardContent sx={noPadding ? { p: 0, '&:last-child': { pb: 0 } } : undefined}>
      {children}
    </CardContent>
  </Card>
);
