import { Header } from "antd/lib/layout/layout";
import React from "react";
import { LeftSide } from "./LeftSide";
import logo from "../../img/logo.png";
import { Switch } from "antd";
import { MoonIcon } from "../../icons/Moon";
import { SunIcon } from "../../icons/Sun";
import { useThemeSwitcher } from "react-css-theme-switcher";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: React.SetStateAction<boolean>) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  if (status === "loading") {
    return null;
  }
  return (
    <Header
      style={{
        padding: "25px 35px",
        position: "fixed",
        top: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          float: "left",
          width: "100px",
          height: "10px",
          padding: "0 35px",
          margin: "-15px 24px 16px 0",
        }}
      >
        <img width={300} height={100} src={logo} alt="Logo" />
      </div>
      <div
        style={{
          margin: "auto",
        }}
      >
        <LeftSide />
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
