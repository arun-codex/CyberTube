import { INITIAL_RESOURCES } from '../data/resources';
import {
  CybersecurityDomain,
  DifficultyLevel,
  DurationRange,
  PricingModel,
  Resource,
  ResourceFilterOptions,
  ResourceType,
  SortOption,
} from '../types/resource';

/**
 * Returns all active resources from the catalog.
 */
export function getAllResources(): Resource[] {
  return INITIAL_RESOURCES.filter((r) => r.status === 'active');
}

/**
 * Returns a single resource by its unique slug.
 */
export function getResourceBySlug(slug: string): Resource | undefined {
  return INITIAL_RESOURCES.find((r) => r.slug === slug && r.status === 'active');
}

/**
 * Returns curated featured resources.
 */
export function getFeaturedResources(limit = 6): Resource[] {
  return getAllResources()
    .filter((r) => r.featured)
    .slice(0, limit);
}

/**
 * Returns resources that belong to a specific cybersecurity domain.
 */
export function getResourcesByDomain(domain: CybersecurityDomain): Resource[] {
  return getAllResources().filter((r) => r.domains.includes(domain));
}

/**
 * Returns resources that match a specific resource type.
 */
export function getResourcesByType(type: ResourceType): Resource[] {
  return getAllResources().filter((r) => r.resourceType === type);
}

/**
 * Finds related resources sharing domains, tags, or skills, excluding the target.
 */
export function getRelatedResources(target: Resource, limit = 3): Resource[] {
  const all = getAllResources().filter((r) => r.id !== target.id);

  // Score candidates based on shared domains and tags
  const scored = all.map((candidate) => {
    let score = 0;
    // Shared domains (weight: 3)
    const sharedDomains = candidate.domains.filter((d) => target.domains.includes(d));
    score += sharedDomains.length * 3;

    // Shared tags (weight: 2)
    const sharedTags = candidate.tags.filter((t) => target.tags.includes(t));
    score += sharedTags.length * 2;

    // Same resource type (weight: 1)
    if (candidate.resourceType === target.resourceType) {
      score += 1;
    }

    return { candidate, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.candidate);
}

/**
 * Helper to test if a numeric duration falls into a named range.
 */
function matchesDurationRange(durationMinutes: number | undefined, range: DurationRange): boolean {
  if (range === 'unknown') {
    return durationMinutes === undefined || durationMinutes === null;
  }
  if (durationMinutes === undefined || durationMinutes === null) {
    return false;
  }
  if (range === 'under-20') {
    return durationMinutes < 20;
  }
  if (range === '20-60') {
    return durationMinutes >= 20 && durationMinutes <= 60;
  }
  if (range === 'over-60') {
    return durationMinutes > 60;
  }
  return false;
}

/**
 * Core search and multi-facet filtering engine.
 */
export function filterResources(
  resources: Resource[],
  options: ResourceFilterOptions = {}
): Resource[] {
  const {
    query = '',
    types = [],
    domains = [],
    difficulty = [],
    pricing = [],
    languages = [],
    durationRanges = [],
    sortBy = 'relevance',
  } = options;

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = resources.filter((res) => {
    // 1. Text Query Search (title, description, provider, creator, tags, skills, domains)
    if (normalizedQuery) {
      const inTitle = res.title.toLowerCase().includes(normalizedQuery);
      const inDesc = res.description.toLowerCase().includes(normalizedQuery);
      const inProvider = res.provider.toLowerCase().includes(normalizedQuery);
      const inCreator = res.creator?.toLowerCase().includes(normalizedQuery) || false;
      const inTags = res.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
      const inSkills = res.skills.some((s) => s.toLowerCase().includes(normalizedQuery));
      const inDomains = res.domains.some((d) => d.toLowerCase().includes(normalizedQuery));

      if (!inTitle && !inDesc && !inProvider && !inCreator && !inTags && !inSkills && !inDomains) {
        return false;
      }
    }

    // 2. Resource Type Filter (OR within facet)
    if (types.length > 0 && !types.includes(res.resourceType)) {
      return false;
    }

    // 3. Domain Filter (OR within facet - resource has at least one of selected domains)
    if (domains.length > 0 && !res.domains.some((d) => domains.includes(d))) {
      return false;
    }

    // 4. Difficulty Filter
    if (difficulty.length > 0 && !difficulty.includes(res.difficulty)) {
      return false;
    }

    // 5. Pricing Filter
    if (pricing.length > 0 && !pricing.includes(res.pricingModel)) {
      return false;
    }

    // 6. Language Filter
    if (languages.length > 0 && !languages.includes(res.language)) {
      return false;
    }

    // 7. Duration Range Filter
    if (durationRanges.length > 0) {
      const matchesAnyRange = durationRanges.some((range) =>
        matchesDurationRange(res.durationMinutes, range)
      );
      if (!matchesAnyRange) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  return sortResources(filtered, sortBy, normalizedQuery);
}

/**
 * Deterministic sorting engine.
 */
function sortResources(
  resources: Resource[],
  sortBy: SortOption,
  normalizedQuery: string
): Resource[] {
  const result = [...resources];

  switch (sortBy) {
    case 'relevance':
      if (!normalizedQuery) {
        // Without query, sort featured first, then newest
        return result.sort((a, b) => {
          if (a.featured !== b.featured) {
            return a.featured ? -1 : 1;
          }
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
      }
      // With query, score title exact matches highest
      return result.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(normalizedQuery);
        const bTitleMatch = b.title.toLowerCase().includes(normalizedQuery);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return a.title.localeCompare(b.title);
      });

    case 'recently-added':
      return result.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });

    case 'title':
      return result.sort((a, b) => a.title.localeCompare(b.title));

    case 'duration-asc':
      return result.sort((a, b) => {
        const durA = a.durationMinutes ?? Infinity;
        const durB = b.durationMinutes ?? Infinity;
        return durA - durB;
      });

    default:
      return result;
  }
}

/**
 * Computes live facet counts derived dynamically from the dataset.
 */
export function getFacetCounts(resources: Resource[]) {
  const typeCounts: Record<string, number> = {};
  const domainCounts: Record<string, number> = {};
  const difficultyCounts: Record<string, number> = {};
  const pricingCounts: Record<string, number> = {};
  const languageCounts: Record<string, number> = {};

  for (const r of resources) {
    typeCounts[r.resourceType] = (typeCounts[r.resourceType] || 0) + 1;
    difficultyCounts[r.difficulty] = (difficultyCounts[r.difficulty] || 0) + 1;
    pricingCounts[r.pricingModel] = (pricingCounts[r.pricingModel] || 0) + 1;
    languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;

    for (const d of r.domains) {
      domainCounts[d] = (domainCounts[d] || 0) + 1;
    }
  }

  return {
    typeCounts,
    domainCounts,
    difficultyCounts,
    pricingCounts,
    languageCounts,
    totalCount: resources.length,
  };
}

