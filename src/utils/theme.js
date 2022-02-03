import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6c5ce7",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        transition: "none",
      },
    },
    MuiTab: {
      root: {
        height: 40,
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
      transition: "none",
      fontSize: "14px",
      fontWeight: 700,
    },
  },
  transitions: {
    create: () => "none",
  },
});
