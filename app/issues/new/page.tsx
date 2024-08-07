"use client";
import { TextField, TextArea, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(text);
  }

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root
        onChange={(event) => setText(event.target.value)}
        placeholder="Title"
      >
        <TextField.Slot>
          <CiTextAlignLeft />
        </TextField.Slot>
      </TextField.Root>
      <SimpleMDE/>
      <Button>Submit new Issue</Button>
    </div>
  );
};

export default NewIssuePage;
