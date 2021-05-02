import React from "react";
import { Footer } from "./Footer";
import { Nav, NavbarVariant } from "./Nav";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  navbar?: boolean;
  navbarVariant: NavbarVariant;
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  navbar,
  navbarVariant,
  ...props
}) => {
  let body = null;
  if (!navbar) {
    body = (
      <>
        <Wrapper {...props} variant={variant}>
          {children}
        </Wrapper>
      </>
    );
  } else {
    body = (
      <>
        <Nav variant={navbarVariant} />
        <Wrapper {...props} variant={variant}>
          {children}
        </Wrapper>
        <Footer />
      </>
    );
  }
  if (navbarVariant == "user") {
    body = (
      <>
        <Nav variant={navbarVariant} />
        <Wrapper {...props} variant={variant}>
          {children}
        </Wrapper>
      </>
    );
  }
  return body;
};
