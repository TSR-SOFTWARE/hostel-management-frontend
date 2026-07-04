import { useConfirmDialog } from '@contexts/ConfirmDialogContext';

export const useConfirm = () => {
  const { confirm } = useConfirmDialog();
  return confirm;
};
