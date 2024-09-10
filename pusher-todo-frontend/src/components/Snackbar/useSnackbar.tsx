import { AlertProps } from '@mui/material';
import { useSnackbar as useNotistackSnackbar } from 'notistack';
import SnackbarCloseButton from './SnackbarCloseButton';

interface SnackbarOptions {
  color?: 'default' | 'error' | 'info' | 'success' | 'warning';
  icon?: AlertProps['icon'];
  closeIcon?: boolean;
}

const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const showSnackbar = (message: string, options?: SnackbarOptions) => {
    enqueueSnackbar(message, {
      variant: options?.color,
      action:
        options?.closeIcon &&
        ((snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />),
    });
  };
  return showSnackbar;
};

export default useSnackbar;
