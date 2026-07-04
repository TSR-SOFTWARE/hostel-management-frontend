import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return '—';
  return dayjs(date).format('DD MMM YYYY');
};

export const formatDateTime = (date: string | null | undefined): string => {
  if (!date) return '—';
  return dayjs(date).format('DD MMM YYYY, hh:mm A');
};

export const fromNow = (date: string | null | undefined): string => {
  if (!date) return '—';
  return dayjs(date).fromNow();
};
