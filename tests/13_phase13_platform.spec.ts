import { test, expect } from '@playwright/test';

test.describe('CyberTube Phase 13 — Complete Learning Platform & Curriculum Verification', () => {

  test('Homepage renders terminal-style hero with $ start-here and core sections', async ({ page }) => {
    await page.goto('/');

    // 1. Verify terminal prompt
    await expect(page.locator('body')).toContainText('$');
    await expect(page.locator('body')).toContainText('start-here');

    // 2. Value cards
    await expect(page.locator('body')).toContainText('Free-First Education');
    await expect(page.locator('body')).toContainText('Lab-First Practice');
    await expect(page.locator('body')).toContainText('Legal & Ethical Focus');

    // 3. CTA buttons
    const startPathBtn = page.locator('a:has-text("Start Your Path")').first();
    await expect(startPathBtn).toBeVisible();
    await expect(startPathBtn).toHaveAttribute('href', '/learning-paths');

    // 4. Exact resource count reflected dynamically
    await expect(page.locator('body')).toContainText('21 Verified Resources');
  });

  test('Resource Library (/library) renders all 21 items with search, filter, and sorting', async ({ page }) => {
    await page.goto('/library');

    // Verify 21 items counter
    await expect(page.locator('body')).toContainText('21 verified learning resources');

    // Test Search input
    const searchInput = page.locator('input[placeholder*="Search by topic"]');
    await searchInput.fill('Packet Tracer');
    await page.waitForTimeout(200);

    // net-01 should be visible
    await expect(page.locator('body')).toContainText('Free CCNA 200-301 Complete Course');
    // Non-matching should not be shown
    await expect(page.locator('text=Zero to Hero')).not.toBeVisible();

    // Clear search
    await searchInput.fill('');
    await page.waitForTimeout(200);

    // Test Difficulty Filter
    const diffSelect = page.locator('select').nth(1); // Difficulty selector
    await diffSelect.selectOption('advanced');
    await expect(page.locator('body')).toContainText('Binary Exploitation / Memory Corruption');
    await expect(page.locator('body')).toContainText('Showing 1 of 21');
  });

  test('Resource Detail (/library/[id]) provides click-to-load embed and YouTube fallback', async ({ page }) => {
    // Navigate to net-01
    await page.goto('/library/net-01');

    await expect(page.locator('h1')).toContainText('Free CCNA 200-301 Complete Course');
    await expect(page.locator('body')).toContainText("Jeremy's IT Lab");

    // Click to load embed container should be present without iframe initialized yet
    const iframeBeforeClick = page.locator('iframe');
    expect(await iframeBeforeClick.count()).toBe(0);

    const clickToLoadBtn = page.locator('div[role="button"][aria-label*="Load video player"]');
    await expect(clickToLoadBtn).toBeVisible();

    // Click to load video
    await clickToLoadBtn.click();
    const iframeAfterClick = page.locator('iframe');
    await expect(iframeAfterClick).toBeVisible();
    await expect(iframeAfterClick).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/videoseries\?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ/);

    // Fallback external link
    const fallbackLink = page.locator('a:has-text("Watch on Original Platform")');
    await expect(fallbackLink).toHaveAttribute('href', 'https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ');
  });

  test('Learning Paths A–E are rendered with correct milestones and official notices', async ({ page }) => {
    // 1. Index page
    await page.goto('/learning-paths');
    await expect(page.locator('body')).toContainText('Path A — Foundations');
    await expect(page.locator('body')).toContainText('Path B — Security+ Certification Track');
    await expect(page.locator('body')).toContainText('Path C — Ethical Hacking & Practical Pentesting');
    await expect(page.locator('body')).toContainText('Path D — Web Application Security');
    await expect(page.locator('body')).toContainText('Path E — Emerging Tracks (Coming Soon)');

    // 2. Check Path B Security+ official exam notice
    await page.goto('/learning-paths/security-plus');
    await expect(page.locator('body')).toContainText('This course covers exam SY0-701. The English SY0-701 exam retires on 11 June 2027.');
    await expect(page.locator('body')).toContainText('The new SY0-801 exam launches around 17 Nov 2026.');

    // 3. Check Path C Ethical Hacking legal reminder
    await page.goto('/learning-paths/ethical-hacking');
    await expect(page.locator('body')).toContainText('Strict Legal Rule: Only test systems you own or have explicit, prior written permission to test.');

    // 4. Milestone completion persists in localStorage
    const markDoneBtn = page.locator('button:has-text("Mark Done")').first();
    await markDoneBtn.click();
    await expect(page.locator('button:has-text("Done")').first()).toBeVisible();

    // Reload and verify persistence
    await page.reload();
    await expect(page.locator('button:has-text("Done")').first()).toBeVisible();
  });

  test('Labs (/labs) page renders 7 curated platforms and ethical rules of engagement', async ({ page }) => {
    await page.goto('/labs');
    await expect(page.locator('body')).toContainText('Legal Practice Labs & Wargames');
    await expect(page.locator('body')).toContainText('Web Security Academy');
    await expect(page.locator('body')).toContainText('TryHackMe');
    await expect(page.locator('body')).toContainText('picoCTF');
    await expect(page.locator('body')).toContainText('Hack The Box');
    await expect(page.locator('body')).toContainText('OverTheWire');
    await expect(page.locator('body')).toContainText('OWASP Juice Shop');
    await expect(page.locator('body')).toContainText('DVWA (Damn Vulnerable Web App)');
  });

  test('Ethics (/ethics) and About (/about) pages communicate responsible conduct and attribution', async ({ page }) => {
    await page.goto('/ethics');
    await expect(page.locator('h1')).toContainText('Hack Legally & Responsibly');
    await expect(page.locator('body')).toContainText('Only test systems you own or have explicit written permission to test');

    await page.goto('/about');
    await expect(page.locator('body')).toContainText('Videos belong to their creators. This site is not affiliated with them.');
    const githubSuggestLink = page.locator('a:has-text("Open GitHub Issue")');
    await expect(githubSuggestLink).toHaveAttribute('href', /github\.com\/arun-codex\/CyberTube\/issues\/new/);
  });

  test('Footer renders required copyright and freshness disclaimer across routes', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('Videos belong to their creators. This site is not affiliated with them. Links last checked Nov 2026.');
  });

  test('Skills Map (/skills) renders categories, tracks progress, and saves in localStorage', async ({ page }) => {
    await page.goto('/skills');
    await expect(page.locator('h1')).toContainText('Cybersecurity Skills Map');
    await expect(page.locator('body')).toContainText('Your Skills Progress');

    // Check categories
    await expect(page.locator('button:has-text("Foundations")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Defensive")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Offensive")').first()).toBeVisible();

    // Toggle skill completion
    const initialProgress = page.locator('text=0%');
    await expect(initialProgress.first()).toBeVisible();

    const firstToggle = page.locator('button[aria-label*="Mark"]').first();
    await firstToggle.click();

    // Should no longer be 0%
    await expect(page.locator('text=0%')).not.toBeVisible();

    // Reload to verify persistence
    await page.reload();
    await expect(page.locator('text=0%')).not.toBeVisible();
  });

  test('Certifications Guide (/certifications) displays SY0-701 notice and vendor neutrality', async ({ page }) => {
    await page.goto('/certifications');
    await expect(page.locator('h1')).toContainText('Industry Certifications Guide');
    await expect(page.locator('body')).toContainText('Vendor-Neutral Policy');
    await expect(page.locator('body')).toContainText('SY0-701');
    await expect(page.locator('body')).toContainText('CompTIA Security+');
    await expect(page.locator('body')).toContainText('Cisco Certified Network Associate');

    // Official vendor button link check
    const comptiaLink = page.locator('a[href*="comptia.org/certifications/security"]').first();
    await expect(comptiaLink).toBeVisible();
  });

  test('Careers Guide (/careers) displays 6 roles with responsibilities and progression ladders', async ({ page }) => {
    await page.goto('/careers');
    await expect(page.locator('h1')).toContainText('Cybersecurity Career Pathways');
    await expect(page.locator('body')).toContainText('Security Operations Center (SOC) Analyst');
    await expect(page.locator('body')).toContainText('Penetration Tester / Ethical Hacker');
    await expect(page.locator('body')).toContainText('Application Security (AppSec) Engineer');
    await expect(page.locator('body')).toContainText('Cloud Security Engineer');
    await expect(page.locator('body')).toContainText('Governance, Risk & Compliance (GRC) Analyst');
    await expect(page.locator('body')).toContainText('Digital Forensics & Incident Response (DFIR) Analyst');
  });

  test('Glossary (/glossary) displays terms, search, and plain-English analogies', async ({ page }) => {
    await page.goto('/glossary');
    await expect(page.locator('h1')).toContainText('Cybersecurity Glossary');
    await expect(page.locator('body')).toContainText('CIA Triad');
    await expect(page.locator('body')).toContainText('Analogy / Real World:');

    // Search filter test
    const searchInput = page.locator('input[placeholder*="Search terms"]');
    await searchInput.fill('SSRF');
    await page.waitForTimeout(200);

    await expect(page.locator('body')).toContainText('Server-Side Request Forgery');
    await expect(page.locator('text=Principle of Least Privilege')).not.toBeVisible();
  });

  test('Cheat Sheets (/cheat-sheets) provides Linux commands and Common Ports with security risks', async ({ page }) => {
    await page.goto('/cheat-sheets');
    await expect(page.locator('h1')).toContainText('Security Cheat Sheets');

    // Linux tab is active by default
    await expect(page.locator('body')).toContainText('File Permissions & Privilege Control');
    await expect(page.locator('body')).toContainText('find / -perm -4000 -type f');

    // Switch to Ports tab
    const portsTab = page.locator('button:has-text("Common Ports & Protocols")');
    await portsTab.click();

    await expect(page.locator('body')).toContainText('Port 22');
    await expect(page.locator('body')).toContainText('Port 443');
    await expect(page.locator('body')).toContainText('Security Implication:');
    await expect(page.locator('body')).toContainText('Port 3389');
  });
});

