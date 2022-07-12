import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { LeftSide } from "./LeftSide";
import logo from "../../img/logo.png";
import { Switch } from "antd";
import { MoonIcon } from "../../icons/Moon";
import { SunIcon } from "../../icons/Sun";
import { useThemeSwitcher } from "react-css-theme-switcher";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#9CB4CC");
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: React.SetStateAction<boolean>) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  useEffect(() => {
    const handleChange = () => {
      if (window.scrollY === 0) {
        setColor("#9CB4CC");
      } else if (window.scrollY > 0) {
        setColor("white");
      }
    };
    window.addEventListener("scroll", handleChange);
    return () => {
      window.removeEventListener("scroll", handleChange);
    };
  }, []);

  if (status === "loading") {
    return null;
  }

  console.log(color);

  return (
    <Header
      style={{
        padding: "35px 75px",
        position: "fixed",
        zIndex: 99,
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
          height: "10px",
          margin: "-15px 24px 16px 0",
          background: color,
        }}
      >
        <img width={300} height={100} src={logo} alt="Logo" />
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
