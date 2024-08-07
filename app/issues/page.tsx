import { Flex, Text, Button } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <>
      <h1>List of issues</h1>
      <Link href="/issues/new">
        <Button>Click here to create an issue</Button>
      </Link>
    </>
  );
};

export default IssuesPage;
