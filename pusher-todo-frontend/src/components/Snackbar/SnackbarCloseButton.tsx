import { useSnackbar, SnackbarKey } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SnackbarCloseButtonProps {
  snackbarKey: SnackbarKey;
}

function SnackbarCloseButton(props: SnackbarCloseButtonProps) {
  const { closeSnackbar } = useSnackbar();
  const { snackbarKey } = props;
  return (
    <IconButton
      size="small"
      onClick={() => closeSnackbar(snackbarKey)}
      sx={{
        position: "absolute",
        right: 4,
        top: 4,
      }}
    >
      <CloseIcon />
    </IconButton>
  );
}

export default SnackbarCloseButton;
