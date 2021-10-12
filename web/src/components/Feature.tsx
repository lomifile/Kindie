import { Flex, Heading, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface FeatureProps {
  title: string;
  desc: string;
  icon?: IconProp;
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  desc,
  icon,
  ...rest
}) => {
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" p={6} flex="1" borderRadius="20px" {...rest}>
        <Heading fontSize="xl">
          <FontAwesomeIcon
            icon={icon}
            style={{ fontSize: "28px", color: "#4299e1", marginRight: "10px" }}
          />
          {title}
        </Heading>
        <Text mt={4}>{desc}</Text>
      </Flex>
    </Flex>
  );
};
