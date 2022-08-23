import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Router from "./routers";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
