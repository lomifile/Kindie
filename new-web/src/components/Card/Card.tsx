import React from "react";
import { Card as AntCard } from "antd";
import type { CardProps as AntCardProps } from "antd";

type CardProps = {
  title?: string;
  borderd?: boolean;
  children?: React.ReactNode;
} & AntCardProps;

export const Card: React.FC<CardProps> = ({
  title,
  borderd,
  children,
  ...props
}) => {
  return (
    <AntCard title={title} bordered {...props} hoverable>
      {children}
    </AntCard>
  );
};
