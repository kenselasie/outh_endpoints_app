"use client";
import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import RotateLogo from "@/assets/rotate_logo.png";
import UserImg from "@/assets/user.png";
import Image from "next/image";
import { Image as ChakraImage} from '@chakra-ui/react'
import { useVerifyUserQuery } from "@/data/use-verify.query";

const Header = ({ props }: any) => {
  const { data: userData, isLoading } = useVerifyUserQuery();
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <Box bg="#ffffff" p={3} left={0} right={0} height={"80px"}>
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
            <Text fontWeight={600}>{userData?.email}</Text>
            <Text marginTop={-2}>{userData?.email}</Text>
          </Flex>
          <ChakraImage
            src={userData?.picture}
            borderRadius='full'
            boxSize='50px'
            alt="rotate_logo"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
