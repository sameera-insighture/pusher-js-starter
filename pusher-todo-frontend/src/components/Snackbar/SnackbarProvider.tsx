import { styled } from "@mui/material";
import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";

export const SnackbarProvider = styled(NotistackSnackbarProvider)(() => ({
  padding: "4px 16px",
  "&>div": {
    padding: 0,
    width: "100%",
    display: "block",
  },
}));
