"use client";
import Header from "@/components/header";
import TableComponent from "@/components/table";
import { useGetEndpoints } from "@/data/use-endpoints.query";
import React from "react";
import { Box, Center, Text, Heading } from "@chakra-ui/react";
import "./list_endpoints.css";
import SearchBar from "@/components/searchbar";
// import isProtected from "@/components/requires/ProtectedRoute";

const Dashboard = () => {
  const { data, error, isLoading } = useGetEndpoints();

  if (isLoading) {
    return <>Loading endpoints...</>;
  }
  if (error) {
    return <>Could not load endpoint data</>;
  }
  return (
    <Box height={'100vh'}>
      {data && (
        <Box bg={'#f4f4f4'}>
          <Header />
          <Box bg="#fffff" borderRadius={20} paddingTop={50} paddingRight={200} paddingLeft={200}>
            <Text fontSize="32px" fontWeight={600} mb={5}>
              Endpoints
            </Text>
            <Box mb={10}>
              <SearchBar />
            </Box>
            <Box bg={"white"}>
              <TableComponent data={data} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
