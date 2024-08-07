"use client";
import { TextField, TextArea, Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { MdErrorOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
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
