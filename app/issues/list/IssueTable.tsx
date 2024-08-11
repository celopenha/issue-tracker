import { Issue, Status } from "@prisma/client";
import Link from "../../_components/Link";
import IssueStatusBadge from "../../_components/IssueStatusBadge";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";


const IssueTable = ({
  searchParams,
  issues,
}: {
  issues: Issue[];
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
    order: string;
  };
}) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {tableColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    order: "asc",
                  },
                }}
              >
                <FaArrowUp className="inline" />
              </NextLink>
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    order: "desc",
                  },
                }}
              >
                <FaArrowDown className="inline" />
              </NextLink>{" "}
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`} key={issue.id}>
                {issue.title}
              </Link>
            </Table.Cell>
            <Table.Cell>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const tableColumns: {
  label: string;
  value: keyof Issue;
  defaultOrder: string;
}[] = [
  { label: "Issue", value: "title", defaultOrder: "asc" },
  { label: "Status", value: "status", defaultOrder: "asc" },
  { label: "Created", value: "createdAt", defaultOrder: "desc" },
];

export default IssueTable;
