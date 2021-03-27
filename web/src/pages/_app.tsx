import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Fonts } from "../components/Fonts";

import theme from "../theme";
import "../css/Navbar.css";
import "../css/Footer.css";
import "../css/Login.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
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
