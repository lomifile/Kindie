import { Menu } from "antd";
import styled from "styled-components";

export const MenuItem = styled(Menu.Item)`
  padding: 0px 5px;
`;

export const MenuItemNoHover = styled(Menu.Item)`
  padding: 0px 5px;

  &:hover {
    border: none;
  }
`;
