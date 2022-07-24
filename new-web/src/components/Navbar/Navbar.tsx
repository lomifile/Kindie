import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { LeftSide } from "./LeftSide";
import { Switch } from "antd";
import { MoonIcon } from "../../icons/Moon";
import { SunIcon } from "../../icons/Sun";
import { useThemeSwitcher } from "react-css-theme-switcher";
import LogoLight from "../../img/logoLight.png";
import LogoDark from "../../img/logoDark.png";
import LogoScroll from "../../img/kindieScroll.png";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#68A7AD");
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: React.SetStateAction<boolean>) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  useEffect(() => {
    const handleChange = () => {
      if (window.scrollY === 0) {
        setColor(currentTheme === "light" ? "#68A7AD" : "#303030");
      } else if (window.scrollY > 0) {
        setColor(currentTheme === "light" ? "white" : "#68A7AD");
      }
    };
    window.addEventListener("scroll", handleChange);
    return () => {
      window.removeEventListener("scroll", handleChange);
    };
  });

  if (status === "loading") {
    return null;
  }

  console.log(color, currentTheme);

  return (
    <Header
      style={{
        padding: "35px 75px",
        position: "fixed",
        zIndex: 100,
        top: 0,
        width: "100%",
        height: "8rem",
        background: color,
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div
        style={{
          float: "left",
          width: "100px",
          height: "30px",
          margin: "-15px 24px 16px 0",
          background: color,
        }}
      >
        {currentTheme === "light" ? (
          window.scrollY > 0 ? (
            <img src={LogoLight} alt="Logo" />
          ) : (
            <img src={LogoScroll} alt="Logo" />
          )
        ) : window.scrollY > 0 ? (
          <img src={LogoDark} alt="Logo" />
        ) : (
          <img src={LogoScroll} alt="Logo" />
        )}
      </div>
      <div
        style={{
          margin: "auto",
        }}
      >
        <LeftSide color={color} />
      </div>
      <div
        style={{
          float: "right",
          marginRight: "45px",
        }}
      >
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={<MoonIcon />}
          unCheckedChildren={<SunIcon />}
        />
      </div>
    </Header>
  );
};
