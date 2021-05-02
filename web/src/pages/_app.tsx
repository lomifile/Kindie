import {
  ChakraProvider,
  ColorModeProvider,
  cookieStorageManager,
  localStorageManager,
  ThemeProvider,
} from "@chakra-ui/react";
import { Fonts } from "../components/Fonts";

import theme from "../theme";
import "../css/Navbar.css";
import "../css/Footer.css";
import "../css/Login.css";
import { init_i18n } from "../lib/i18n";
import { isServer } from "../utils/isServer";

if (!isServer()) {
  init_i18n();
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
