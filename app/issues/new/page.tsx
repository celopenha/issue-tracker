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
import { createIssueSchema } from "../../validationSchema";
import { z } from "zod";
import ErrorMessage from "../../_components/ErrorMessage";
import Spinner from "../../_components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      setIsSubmitting(false);
      router.push("/issues");
    } catch (error) {
      console.error(error);
      setError("An unexcpected error occurred");
    }
  }

  return (
    <>
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot>
            <CiTextAlignLeft />
          </TextField.Slot>
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <TextArea
          placeholder="Write a description…"
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
          Submit new Issue{isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default NewIssuePage;
