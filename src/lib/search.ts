import { getAllResources } from './catalog';
import { COURSES as courses } from '../data/courses';
import { CYBERSECURITY_DOMAINS } from '../data/metadata';

export interface SearchResultItem {
  id: string;
  type: 'course' | 'resource' | 'domain';
  title: string;
  description: string;
  url: string;
  badge: string;
  category?: string;
  tags?: string[];
}

export function searchGlobalCatalog(query: string): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResultItem[] = [];

  // 1. Search Courses
  for (const course of courses) {
    const titleMatch = course.title.toLowerCase().includes(cleanQuery);
    const descMatch = course.description.toLowerCase().includes(cleanQuery);
    const domainMatch = course.domains.some(d => d.toLowerCase().includes(cleanQuery));
    const tagMatch = course.tags.some(t => t.toLowerCase().includes(cleanQuery));

    if (titleMatch || descMatch || domainMatch || tagMatch) {
      results.push({
        id: `course-${course.id}`,
        type: 'course',
        title: course.title,
        description: course.description,
        url: `/courses/${course.slug}`,
        badge: 'COURSE',
        category: course.domains[0],
        tags: course.tags.slice(0, 3),
      });
    }
  }

  // 2. Search Resources
  const resources = getAllResources();
  for (const res of resources) {
    const titleMatch = res.title.toLowerCase().includes(cleanQuery);
    const descMatch = res.description.toLowerCase().includes(cleanQuery);
    const domainMatch = res.domains.some(d => d.toLowerCase().includes(cleanQuery));
    const tagMatch = res.tags.some(t => t.toLowerCase().includes(cleanQuery));

    if (titleMatch || descMatch || domainMatch || tagMatch) {
      results.push({
        id: `resource-${res.id}`,
        type: 'resource',
        title: res.title,
        description: res.description,
        url: `/resources/${res.slug}`,
        badge: res.resourceType.toUpperCase(),
        category: res.domains[0],
        tags: res.tags.slice(0, 3),
      });
    }
  }

  // 3. Search Cybersecurity Domains
  for (const domain of CYBERSECURITY_DOMAINS) {
    const nameMatch = domain.name.toLowerCase().includes(cleanQuery);
    const descMatch = domain.shortDescription.toLowerCase().includes(cleanQuery);
    const idMatch = domain.id.toLowerCase().includes(cleanQuery);

    if (nameMatch || descMatch || idMatch) {
      results.push({
        id: `domain-${domain.id}`,
        type: 'domain',
        title: domain.name,
        description: domain.shortDescription,
        url: `/discover?domain=${domain.id}`,
        badge: 'DOMAIN',
      });
    }
  }

  return results.slice(0, 10);
}
