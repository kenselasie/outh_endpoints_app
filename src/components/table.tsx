"use client";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spacer,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
} from "chakra-paginator";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

interface ITableData {
  endpoint: string;
  service_name: string;
  http_command: string | string[];
  name: string;
  rpc_queue: string;
  rest_action: string;
  kwargs: {
    min_role?: number | null | undefined;
    workflow?: boolean | undefined;
  };
}

const TableComponent = ({ data, search }: { data: ITableData[], search: string }) => {
  const itemLimit = 5;
  const [pagesQuantity, setPagesQuantity] = React.useState(0);
  const [endpointData, setEndpointData] = React.useState(data);
  const [curPage, setCurPage] = React.useState(0);

  const [curItems, setCurItems] = React.useState<ITableData[]>([]);

  const normalStyles = {
    bg: "white",
    color: "black",
    padding: "12px",
  };

  const activeStyles = {
    bg: "#4763E4",
    color: "white",
    padding: "12px",
  };

  const handlePageChange = (page: number) => {
    setCurPage(page);
  };

  const generatePages = (totalPages: number) => {
    const pages = [];

    // Calculate the starting and ending page numbers
    let startPage = Math.max(1, curPage - Math.floor(itemLimit / 2));
    let endPage = startPage + itemLimit - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - itemLimit + 1);
    }
   
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

 



  React.useEffect(() => {
    setEndpointData(data?.filter((element) => element.name.includes(search)))
  }, [data, search])

  React.useEffect(() => {
    const pagesTotal = Math.ceil(endpointData.length / itemLimit);

    setPagesQuantity(pagesTotal);
  }, [endpointData.length]);

  React.useEffect(() => {
    const offset = curPage * itemLimit;
    const getList = (curPage: number, itemLimit: number) => {
      setCurItems(endpointData.slice(offset, offset + itemLimit));
    };

    getList(curPage, itemLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage, itemLimit, endpointData]);

  return (
    <>
      <TableContainer display={"block"}>
        <Table size={"sm"} variant="simple" className="table-tiny">
          <Thead height={"60px"}>
            <Tr
              fontSize={16}
              fontStyle={""}
              padding={"100px"}
              borderRadius={100}
            >
              <Th>Name</Th>
              <Th>Endpoint</Th>
              <Th>Service</Th>
              <Th>Queue</Th>
              <Th>Security</Th>
              <Th>Http Commands</Th>
            </Tr>
          </Thead>
          <Tbody>
            {curItems?.map((data, key) => (
              <Tr key={key}>
                <Td>{data.name}</Td>
                <Td>{data.endpoint}</Td>
                <Td>{data.service_name}</Td>
                <Td>{data.rpc_queue}</Td>
                <Td>{data.rest_action}</Td>
                <Td>
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Button
                      bg={"white"}
                      width={166}
                      color={"#4763E4"}
                      borderRadius={14}
                      border={"1px solid #4763E4"}
                    >
                      {data.http_command}
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex alignItems={"center"} justifyContent={"center"} p={2} mt={120}>
        <Text>{endpointData.length} records</Text>
        <Spacer />
        <Paginator
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity - 1}
          isDisabled={false}
          border={"1px solid #f2f2f2"}
          borderRadius={14}
          marginLeft={10}
        >
          <Previous bg="white">
            <CgChevronLeft />
          </Previous>
          <PageGroup>
            {generatePages(pagesQuantity)?.map((page) => (
              <Page
                key={`paginator_page_${page}`}
                page={page as number - 1}
                normalStyles={normalStyles}
                activeStyles={activeStyles}
              />
            ))}
          </PageGroup>
          <Next bg="white">
            <CgChevronRight />
          </Next>
        </Paginator>
      </Flex>
    </>
  );
};

export default TableComponent;
