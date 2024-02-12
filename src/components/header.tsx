"use client";
import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import RotateLogo from "@/assets/rotate_logo.png";
import UserImg from "@/assets/user.png";
import Image from "next/image";
const Header = ({ props }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  return (
    <Box bg="#ffffff" p={3} left={0} right={0}>
      <Flex
        as="header"
        w="100%"
        align="center"
        justify="space-between"
        boxSize="full"
        bg="#ffffff"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Image src={RotateLogo} alt="rotate_logo" />
          </Heading>
        </Flex>

        <Flex>
          <Flex
            color={"black"}
            direction={"column"}
            justifyContent={"center"}
            mr={5}
          >
            <Text>Theodore Winters</Text>
            <Text>twinters@gmail.com</Text>
          </Flex>
          <Image className="roundedImage" src={UserImg} alt="rotate_logo" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
