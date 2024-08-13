"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  async function assignIssue(userId: string) {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        userId: userId || null,
      });
      toast.success("Issue owner changed successfuly");
    } catch (error) {
      console.error(error);
      toast.error("Changes could not be saved");
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.userId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.fullName}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
