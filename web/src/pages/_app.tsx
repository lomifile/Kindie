import {
  ChakraProvider,
  ColorModeProvider,
  cookieStorageManager,
  localStorageManager,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fonts } from "../components/Fonts";

import theme from "../theme";
import "../css/Navbar.css";
import "../css/Footer.css";
import "../css/Login.css";
import { init_i18n } from "../lib/i18n";
import { isServer } from "../utils/isServer";
import { bgColor } from "../utils/colorModeColors";

if (!isServer()) {
  init_i18n();
}

function MyApp({ cookies, Component, pageProps }) {
  return (
    <ChakraProvider
      colorModeManager={
        typeof cookies === "string"
          ? cookieStorageManager(cookies)
          : localStorageManager
      }
      resetCSS
      theme={theme}
    >
      <Fonts />
      <ColorModeProvider options={{}}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = ({ req }) => {
  return {
    // first time users will not have any cookies and you may not return
    // undefined here, hence ?? is necessary
    cookies: req.headers.cookie ?? "",
  };
};

export default MyApp;
