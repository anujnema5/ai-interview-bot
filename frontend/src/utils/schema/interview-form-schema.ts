import { z } from "zod";

export type InterviewFormData = z.infer<typeof interviewFormSchema>;

// Define the validation schema using Zod
export const interviewFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  resume: z.any().refine((file: FileList) => file?.length === 1, {
    message: "Resume is required",
  }),
  jobTitle: z.string().min(1, "Job Title is required"),
  experience: z.enum(["Entry Level (0-1 Years)", "Mid Level (2-5 Years)", "Senior Level (5+ Years)"]),

});