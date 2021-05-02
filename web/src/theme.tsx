import { color, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { bgColor } from "./utils/colorModeColors";

const fonts = { mono: `'Menlo', monospace`, heading: `'Cairo', sans-serif` };

const breakpoints = createBreakpoints({
  xs: "320px",
  sm: "375px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
});

const theme = extendTheme({
  colors: {
    dark: bgColor.dark,
    light: bgColor.light,
    brand: {
      100: "#33BFD9",
      200: "#72D3E5",
      300: "#A9DDE7",
    },
  },
  fonts,
  // @ts-ignore
  breakpoints,
  icons: {
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: "0 0 3000 3163",
    },
  },
});

export default theme;
