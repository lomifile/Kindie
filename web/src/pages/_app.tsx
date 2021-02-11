import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "../css/Navbar.css";
import "../css/Footer.css";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
