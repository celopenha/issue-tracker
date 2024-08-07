import IssueStatusBadge from "@/app/_components/IssueStatusBadge";
import { Card, Heading } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <div className="max-w-lg">
      <Heading as="h2">
        <Skeleton />
      </Heading>
      <div className="flex space-x-3 my-2">
        <Skeleton width="5rem"/>
        <Skeleton  width="8rem"/>
      </div>
      <Card className="mt-2">
        <Skeleton count={7} />
      </Card>
    </div>
  );
};

export default LoadingIssueDetailPage;
