import rawResources from '@/../data/resources.json';
import rawPaths from '@/../data/paths.json';
import rawSkills from '@/../data/skills.json';
import rawCertifications from '@/../data/certifications.json';
import rawCareers from '@/../data/careers.json';
import rawGlossary from '@/../data/glossary.json';
import rawCheatSheets from '@/../data/cheat-sheets.json';
import {
  Resource,
  ResourceSchema,
  LearningPathDefinition,
  PathSchema,
  SkillItem,
  SkillSchema,
  CertificationItem,
  CertificationSchema,
  CareerItem,
  CareerSchema,
  GlossaryTerm,
  GlossaryTermSchema,
  CheatSheetData,
  CheatSheetSchema,
} from '@/types/catalog';

// Parse and validate with Zod at runtime
export const authoritativeResources: Resource[] = rawResources.map((item) => {
  const parsed = ResourceSchema.safeParse(item);
  if (!parsed.success) {
    throw new Error(`Data validation failed for resource ${item.id}: ${parsed.error.message}`);
  }
  return parsed.data;
});

export const authoritativePaths: LearningPathDefinition[] = rawPaths.map((item) => {
  const parsed = PathSchema.safeParse(item);
  if (!parsed.success) {
    throw new Error(`Data validation failed for path ${item.id}: ${parsed.error.message}`);
  }
  return parsed.data;
});

export const authoritativeSkills: SkillItem[] = rawSkills.map((item) => {
  const parsed = SkillSchema.safeParse(item);
  if (!parsed.success) {
    throw new Error(`Data validation failed for skill ${item.id}: ${parsed.error.message}`);
  }
  return parsed.data;
});

export const authoritativeCertifications: CertificationItem[] = rawCertifications.map((item) => {
  const parsed = CertificationSchema.safeParse(item);
  if (!parsed.success) {
    throw new Error(`Data validation failed for cert ${item.id}: ${parsed.error.message}`);
  }
  return parsed.data;
});

export const authoritativeCareers: CareerItem[] = rawCareers.map((item) => {
  const parsed = CareerSchema.safeParse(item);
  if (!parsed.success) {
    throw new Error(`Data validation failed for career ${item.id}: ${parsed.error.message}`);
  }
  return parsed.data;
});

export const authoritativeGlossary: GlossaryTerm[] = rawGlossary.map((item) => {
  const parsed = GlossaryTermSchema.safeParse(item);
  if (!parsed.success) {
    throw new Error(`Data validation failed for glossary term ${item.id}: ${parsed.error.message}`);
  }
  return parsed.data;
});

const parsedCheatSheet = CheatSheetSchema.safeParse(rawCheatSheets);
if (!parsedCheatSheet.success) {
  throw new Error(`Data validation failed for cheat sheets: ${parsedCheatSheet.error.message}`);
}
export const authoritativeCheatSheets: CheatSheetData = parsedCheatSheet.data;

export function getAllAuthoritativeResources(): Resource[] {
  return authoritativeResources;
}

export function getAuthoritativeResourceById(id: string): Resource | undefined {
  return authoritativeResources.find((r) => r.id === id);
}

export function getAuthoritativeResourcesByTrack(track: string): Resource[] {
  return authoritativeResources.filter((r) => r.track.toLowerCase() === track.toLowerCase());
}

export function getAllAuthoritativePaths(): LearningPathDefinition[] {
  return authoritativePaths;
}

export function getAuthoritativePathBySlug(slug: string): LearningPathDefinition | undefined {
  return authoritativePaths.find((p) => p.slug === slug);
}

export function getAllAuthoritativeSkills(): SkillItem[] {
  return authoritativeSkills;
}

export function getAllAuthoritativeCertifications(): CertificationItem[] {
  return authoritativeCertifications;
}

export function getAllAuthoritativeCareers(): CareerItem[] {
  return authoritativeCareers;
}

export function getAllAuthoritativeGlossary(): GlossaryTerm[] {
  return authoritativeGlossary;
}

export function getAuthoritativeCheatSheets(): CheatSheetData {
  return authoritativeCheatSheets;
}

export function getYouTubeEmbedInfo(url: string): { embedUrl: string; type: 'playlist' | 'video' | 'external' } {
  if (url.includes('youtube.com/playlist?list=')) {
    const listId = url.split('list=')[1]?.split('&')[0];
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}`,
      type: 'playlist',
    };
  }

  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      type: 'video',
    };
  }

  return {
    embedUrl: url,
    type: 'external',
  };
}
