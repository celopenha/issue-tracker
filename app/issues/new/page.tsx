"use client";
import { TextField, TextArea, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        const response = await axios.post("/api/issues", data);
        if (response.status === 201) {
          router.push("/issues");
        }
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")}>
        <TextField.Slot>
          <CiTextAlignLeft />
        </TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE {...field} />}
      />

      <Button>Submit new Issue</Button>
    </form>
  );
};

export default NewIssuePage;
