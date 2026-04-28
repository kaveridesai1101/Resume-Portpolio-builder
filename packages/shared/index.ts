import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional(),
});

export const ExperienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  duration: z.string(),
  responsibilities: z.string(),
});

export const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  techStack: z.string(),
  link: z.string().url().optional().or(z.literal('')),
});

export const EducationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  year: z.string(),
  gpa: z.string().optional(),
  relevant: z.string().optional(),
});

export const ResumeInputSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
  education: z.array(EducationSchema),
  skills: z.array(z.string()),
  projects: z.array(ProjectSchema),
  experience: z.array(ExperienceSchema),
  jobRole: z.string(),
  experienceLevel: z.enum(['Fresher', 'Junior', 'Mid', 'Senior']),
  targetCompanyType: z.string().optional(),
});

export type UserInput = z.infer<typeof UserSchema>;
export type ResumeInput = z.infer<typeof ResumeInputSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Education = z.infer<typeof EducationSchema>;
