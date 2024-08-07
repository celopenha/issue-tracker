import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title is too short")
    .nonempty("Title is required")
    .max(255, "The title is too big"),
  description: z
    .string()
    .min(5, "Description is too short")
    .nonempty("Description is required")
    .max(2200, "The description is too big"),
});
