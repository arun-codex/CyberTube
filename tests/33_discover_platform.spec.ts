import { test, expect } from '@playwright/test';

test.describe('CyberTube Discover Platform (Phase 22.1 Foundation)', () => {

  test('1. Categories API returns 16 valid enabled categories', async ({ request }) => {
    const res = await request.get('/api/discover/categories');
    expect(res.status()).toBe(200);

    const data = await res.json();
    expect(Array.isArray(data.categories)).toBe(true);
    expect(data.categories.length).toBeGreaterThanOrEqual(16);

    const slugs = data.categories.map((c: any) => c.slug);
    const requiredSlugs = [
      'cybersecurity',
      'artificial-intelligence',
      'machine-learning',
      'programming',
      'web-development',
      'networking',
      'cloud-computing',
      'devops',
      'linux',
      'open-source',
      'hardware',
      'iot',
      'embedded-systems',
      'robotics',
      'technology-research',
      'software-releases',
    ];

    for (const slug of requiredSlugs) {
      expect(slugs).toContain(slug);
    }
  });

  test('2. Topics API returns enabled topics and supports category filtering', async ({ request }) => {
    const resAll = await request.get('/api/discover/topics');
    expect(resAll.status()).toBe(200);

    const dataAll = await resAll.json();
    expect(Array.isArray(dataAll.topics)).toBe(true);
    expect(dataAll.topics.length).toBeGreaterThanOrEqual(16);

    // Verify topic structure
    const first = dataAll.topics[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('slug');
    expect(first).toHaveProperty('keywords');

    // Filter by specific category
    const resFiltered = await request.get('/api/discover/topics?category=cybersecurity');
    expect(resFiltered.status()).toBe(200);
    const dataFiltered = await resFiltered.json();
    expect(dataFiltered.topics.length).toBeGreaterThan(0);
    dataFiltered.topics.forEach((t: any) => {
      expect(t.category_id === 'cybersecurity' || t.category_slug === 'cybersecurity').toBe(true);
    });
  });

  test('3. Feed API validates pagination and clamps pageSize <= 50', async ({ request }) => {
    const res = await request.get('/api/discover/feed?pageSize=999&page=1');
    expect(res.status()).toBe(200);

    const data = await res.json();
    expect(data.pageSize).toBeLessThanOrEqual(50);
    expect(Array.isArray(data.items)).toBe(true);
    expect(typeof data.total).toBe('number');
  });

  test('4. Search API enforces query length validation and rejects short queries', async ({ request }) => {
    const resShort = await request.get('/api/discover/search?q=a');
    expect(resShort.status()).toBe(400);

    const errorData = await resShort.json();
    expect(errorData).toHaveProperty('error');

    const resValid = await request.get('/api/discover/search?q=cybersecurity');
    expect(resValid.status()).toBe(200);
    const validData = await resValid.json();
    expect(Array.isArray(validData.items)).toBe(true);
  });

  test('5. Interests API rejects unauthenticated requests with 401', async ({ request }) => {
    const resGet = await request.get('/api/discover/interests');
    expect(resGet.status()).toBe(401);

    const resPost = await request.post('/api/discover/interests', {
      data: { interests: ['threat-intelligence'] },
    });
    expect(resPost.status()).toBe(401);
  });

  test('6. Status API returns operational flags without leaking secrets', async ({ request }) => {
    const res = await request.get('/api/discover/status');
    expect(res.status()).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('enabled');
    expect(data).toHaveProperty('allowPaidServices', false);
    expect(data).toHaveProperty('automatedYouTubeDiscoveryEnabled', false);
    expect(data.totalCategories).toBeGreaterThanOrEqual(16);
    expect(data.totalTopics).toBeGreaterThanOrEqual(16);

    // Ensure no secrets or environment dumps
    const stringified = JSON.stringify(data).toLowerCase();
    expect(stringified).not.toContain('secret');
    expect(stringified).not.toContain('service_role');
  });

  test('7. Discover page UI renders header, navigation tabs, category pills, and interest selector', async ({ page }) => {
    await page.goto('/discover');

    // Heading
    await expect(page.locator('h1')).toContainText('Discover');

    // Tabs
    await expect(page.getByRole('button', { name: 'For You' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Latest' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Technology Updates' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Resource Directory' })).toBeVisible();

    // Technical Interests section
    await expect(page.getByText('Follow Your Technical Interests')).toBeVisible();

    // Guest sign-in prompt
    await expect(page.getByText(/Sign in to save your followed topics/i)).toBeVisible();
  });

  test('8. Switching to Resource Directory tab preserves catalog with search and filters', async ({ page }) => {
    await page.goto('/discover');

    const catalogTab = page.getByRole('button', { name: 'Resource Directory' });
    await catalogTab.click();

    // Verify filter sidebar and resource cards exist in Resource Directory tab
    await expect(page.getByRole('heading', { name: 'Filters' })).toBeVisible();
    await expect(page.locator('article, .rounded-\\[8px\\]').first()).toBeVisible();
  });
});
