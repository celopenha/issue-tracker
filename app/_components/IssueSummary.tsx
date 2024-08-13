import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: string;
  }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "In-Progress issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
  ];

  return (
    <>
    <Heading size="7" mb="4">Summary</Heading>
    <Flex gap={"4"} className="mb-4">
      {containers.map((container) => (
        <Link
          className="text-sm font-medium hover:cursor-pointer hover:scale-110 transition-all duration-200"
          key={container.label}
          href={`/dashboard/issues/list?status=${container.status}`}
        >
          <Card>
            <Flex direction="column" gap={"1"}>
              {container.label}
              <Text className="font-bold text-gray-700" size={"8"}>{container.value}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
    </>
  );
};

export default IssueSummary;
