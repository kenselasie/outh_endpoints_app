import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import SearchIcon from "@/assets/search.png";
import Image from "next/image";

interface ISearchBar {
  searchItem: (search: string) => void;
}
const SearchBar = ({ searchItem }: ISearchBar) => {

  return (
    <>
      <InputGroup bg={"white"} borderRadius={20} size="lg">
        <InputLeftElement pointerEvents="none">
          <Image src={SearchIcon} alt="search" />
        </InputLeftElement>
        <Input
          onChange={(e) => searchItem(e.target.value)}
          type="text"
          placeholder="Type to search an endpoint..."
          border={"1px solid #4763E4"}
        />
      </InputGroup>
    </>
  );
};
export default SearchBar;
