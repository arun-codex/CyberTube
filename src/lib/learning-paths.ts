import { LEARNING_PATHS } from '../data/learning-paths';
import { LearningPath } from '../types/learning-path';

export function getAllLearningPaths(): LearningPath[] {
  return LEARNING_PATHS;
}

export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  return LEARNING_PATHS.find((path) => path.slug === slug);
}

