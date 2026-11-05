import { z } from 'zod';

export const ResourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  creator: z.string().min(1),
  url: z.string().url(),
  level: z.enum(['beginner', 'beginner-intermediate', 'intermediate', 'advanced', 'all levels']),
  track: z.string().min(1),
  type: z.enum(['playlist', 'video', 'lab']),
  cost: z.enum(['free', 'free-and-paid']),
  notes: z.string(),
  lastChecked: z.string(),
  verificationStatus: z.enum(['verified', 'pending', 'inactive']),
});

export type Resource = z.infer<typeof ResourceSchema>;

export const PathStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: z.string().min(1),
  goal: z.string().min(1),
  resourceIds: z.array(z.string()),
  resourceChoice: z.string().optional(),
  companionLabId: z.string().optional(),
  estimatedTime: z.string().optional(),
  specialNote: z.string().optional(),
  checklist: z.array(z.string()),
});

export type PathStep = z.infer<typeof PathStepSchema>;

export const ComingSoonTrackSchema = z.object({
  title: z.string(),
  level: z.string(),
  summary: z.string(),
  skillsCovered: z.array(z.string()),
  suggestAction: z.string(),
});

export const PathSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  duration: z.string(),
  level: z.string(),
  description: z.string(),
  prerequisites: z.array(z.string()).optional(),
  companionLabs: z.array(z.string()).optional(),
  versionNotice: z.string().optional(),
  versionNoticeVerified: z.string().optional(),
  legalReminder: z.string().optional(),
  isComingSoon: z.boolean().optional(),
  steps: z.array(PathStepSchema).optional(),
  tracks: z.array(ComingSoonTrackSchema).optional(),
});

export type LearningPathDefinition = z.infer<typeof PathSchema>;

export const SkillSchema = z.object({
  id: z.string().min(1),
  category: z.enum([
    'Foundations',
    'Security basics',
    'Scripting',
    'Defensive',
    'Offensive',
    'Cloud & AI security',
    'Soft skills',
  ]),
  title: z.string().min(1),
  beginnerExplanation: z.string().min(1),
  whatGoodLooksLike: z.array(z.string().min(1)),
  linkedResourceIds: z.array(z.string()),
});

export type SkillItem = z.infer<typeof SkillSchema>;

export const CertificationSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  title: z.string().min(1),
  issuer: z.string().min(1),
  level: z.enum(['Entry-Level', 'Associate', 'Intermediate', 'Advanced']),
  overview: z.string().min(1),
  domains: z.array(z.object({
    name: z.string(),
    weight: z.string(),
  })),
  examFormat: z.object({
    duration: z.string(),
    maxQuestions: z.string(),
    questionTypes: z.string(),
    passingScore: z.string(),
  }),
  versionNotice: z.string().optional(),
  preparationTips: z.array(z.string()),
  recommendedResourceIds: z.array(z.string()),
  officialVendorUrl: z.string().url(),
});

export type CertificationItem = z.infer<typeof CertificationSchema>;

export const CareerSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(['Defensive', 'Offensive', 'Engineering', 'Cloud', 'Governance', 'Investigation']),
  summary: z.string().min(1),
  dailyResponsibilities: z.array(z.string()),
  keySkills: z.array(z.string()),
  entryCertifications: z.array(z.string()),
  recommendedPaths: z.array(z.string()),
  progression: z.array(z.string()),
});

export type CareerItem = z.infer<typeof CareerSchema>;

export const GlossaryTermSchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1),
  category: z.enum(['Fundamentals', 'Networking', 'Threats & Attacks', 'Defense & Monitoring', 'Cryptography', 'Cloud & Architecture']),
  definition: z.string().min(1),
  plainEnglishExplanation: z.string().min(1),
  exampleOrAnalogy: z.string().min(1),
  relatedTerms: z.array(z.string()).optional(),
});

export type GlossaryTerm = z.infer<typeof GlossaryTermSchema>;

export const CommandItemSchema = z.object({
  command: z.string(),
  description: z.string(),
  example: z.string().optional(),
  flagExplanation: z.string().optional(),
});

export const PortItemSchema = z.object({
  port: z.number().int(),
  protocol: z.enum(['TCP', 'UDP', 'TCP/UDP']),
  service: z.string(),
  description: z.string(),
  securityImplication: z.string(),
});

export const CheatSheetSchema = z.object({
  linux: z.array(z.object({
    category: z.string(),
    description: z.string(),
    commands: z.array(CommandItemSchema),
  })),
  ports: z.array(PortItemSchema),
});

export type CheatSheetData = z.infer<typeof CheatSheetSchema>;

