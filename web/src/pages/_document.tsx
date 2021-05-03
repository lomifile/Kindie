import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { AdBanner } from "../components/AdBanner";
import isElectron from "is-electron";

export default class Document extends NextDocument {
  render() {
    console.log(isElectron());
    console.log(process.versions.hasOwnProperty('electron'))
      return (
      <Html>
        <Head>
          <script
            data-ad-client="ca-pub-7377394476088299"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <AdBanner />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

