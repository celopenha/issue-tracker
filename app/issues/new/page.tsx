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

  return (
    <>
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            console.error(error);
            setError("An unexcpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot>
            <CiTextAlignLeft />
          </TextField.Slot>
        </TextField.Root>
        {errors.title && <Text as="p" color="red">{errors.title.message}</Text>}
        <TextArea
          placeholder="Write a description…"
          {...register("description")}
        />
        {errors.description && <Text as="p" color="red">{errors.description.message}</Text>}

        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <MdErrorOutline />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Button>Submit new Issue</Button>
      </form>
    </>
  );
};

export default NewIssuePage;
