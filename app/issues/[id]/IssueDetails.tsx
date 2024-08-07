import IssueStatusBadge from "@/app/_components/IssueStatusBadge";
import { Heading, Text, Card } from "@radix-ui/themes";

const IssueDetails = ({ issue }: any) => {
  return (
    <>
      <Heading as="h2">{issue.title}</Heading>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="mt-2">
        <p>{issue.description}</p>
      </Card>
    </>
  );
};

export default IssueDetails;
