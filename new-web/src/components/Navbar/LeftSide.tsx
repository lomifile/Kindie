import React from "react";
import { Grid, Menu } from "antd";
import { MenuItem } from "./Menu.style";

const { useBreakpoint } = Grid;

export const LeftSide: React.FC = () => {
  const { md } = useBreakpoint();
  return (
    <Menu
      theme="light"
      mode={md ? "horizontal" : "inline"}
      style={{
        border: "none",
        float: "right",
      }}
    >
      <MenuItem key="home">
        <a href="##">Home</a>
      </MenuItem>
      <MenuItem key="about-us">
        <a href="##">About us</a>
      </MenuItem>
      <MenuItem key="contact-us">
        <a href="##">Contact Us</a>
      </MenuItem>
    </Menu>
  );
};
