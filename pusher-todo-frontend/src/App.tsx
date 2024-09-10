import {
  Box,
  createTheme,
  CssBaseline,
  PaletteMode,
  Stack,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AppAppBar from "components/AppAppBar";
import Features from "components/Features";
import Testimonials from "components/Testimonials";
import FAQ from "components/FAQ";
import Footer from "components/Footer";
import LogoCollection from "components/LogoCollection";
import getTodoTheme from "getTodoTheme";
import Highlights from "components/Highlights";
import Pricing from "components/Pricing";
import Todo from "components/Todo";
import { SnackbarProvider } from "components/Snackbar/SnackbarProvider";

interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

const App: React.FC = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getTodoTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        hideIconVariant
        maxSnack={3}
      >
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Box sx={{ bgcolor: "background.default" }}>
          <Todo />
          <Stack display="none">
            <LogoCollection />
            <Features />
            <Divider />
            <Testimonials />
            <Divider />
            <Highlights />
            <Divider />
            <Pricing />
            <Divider />
            <FAQ />
            <Divider />
            <Footer />
          </Stack>
        </Box>
        <ToggleCustomTheme
          showCustomTheme={showCustomTheme}
          toggleCustomTheme={toggleCustomTheme}
        />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
