import { Avatar, type AvatarProps } from '@mui/material';
import { getInitials } from '@utils/string.utils';

interface AppAvatarProps extends AvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
}

export const AppAvatar = ({ firstName, lastName, size = 36, src, ...props }: AppAvatarProps) => (
  <Avatar
    src={src}
    sx={{ width: size, height: size, fontSize: size * 0.4, bgcolor: 'primary.main', ...props.sx }}
    {...props}
  >
    {!src && getInitials(firstName, lastName)}
  </Avatar>
);
