import { z } from "zod";

export const issueSchema = z.object({
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

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title is too short")
    .nonempty("Title is required")
    .max(255, "The title is too big")
    .optional(),
  description: z
    .string()
    .min(5, "Description is too short")
    .nonempty("Description is required")
    .max(2200, "The description is too big")
    .optional(),
  userId: z
    .string()
    .max(255)
    .optional()
    .nullable(),
});
