import IssueStatusBadge from "@/app/_components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Heading, Text, Card } from "@radix-ui/themes";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <div className="flex space-x-3 my-2 bg-yellow-100 px-3 py-2 rounded-md shadow-lg border border-yellow-300">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <div className="mx-6 md:mx-2 font-bot text-xl md:text-2xl">{issue.title}</div>
      <Text className="mt-2">
        <p className="text-sm text-neutral-500">{issue.description}</p>
      </Text>
    </>
  );
};

export default IssueDetails;
