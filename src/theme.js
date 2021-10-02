import { createTheme } from "@material-ui/core/styles";
export default createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(44, 214, 176, 1)",
      main: "rgba(37, 121, 108, 1)",
      dark: "rgba(5, 78, 62, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(127, 241, 0, 1)",
      main: "rgba(93, 156, 23, 1)",
      dark: "rgba(54, 100, 1, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
