"use client";
import { TextField, TextArea, Button, Callout, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { MdErrorOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "../../validationSchema";
import { z } from "zod";
import ErrorMessage from "../../_components/ErrorMessage";
import Spinner from "../../_components/Spinner";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: any) {
    try {
      setIsSubmitting(true);

      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }

      setIsSubmitting(false);

      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("An unexcpected error occurred");
    }
  }

  return (
    <>
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        >
          <TextField.Slot>
            <CiTextAlignLeft />
          </TextField.Slot>
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <TextArea
          placeholder="Write a description…"
          defaultValue={issue?.description}
          {...register("description")}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <MdErrorOutline />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Button disabled={isSubmitting}>
          {issue ? "Edit Issue" : "Submit new issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default IssueForm;
