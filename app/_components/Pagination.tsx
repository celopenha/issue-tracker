"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (pageCount <= 1) return null;

  return (
    <Flex justify="end" align="center">
      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => {
          changePage(1);
        }}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button
        onClick={() => {
          changePage(currentPage - 1);
        }}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </Button>
      <Button
        onClick={() => {
          changePage(currentPage + 1);
        }}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <IoIosArrowForward />
      </Button>
      <Button
        onClick={() => {
          changePage(pageCount);
        }}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
