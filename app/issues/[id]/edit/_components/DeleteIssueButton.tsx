"use client";

import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/app/_components/Spinner";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);

  const onDeleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            <MdDeleteOutline />
            Delete issue {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This action can not be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                onClick={onDeleteIssue}
                variant="solid"
                color="red"
              >
                Confirm Deletion
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button onClick={() => setError(false)} color="gray" variant="soft">
              OK
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
