import { expect, test } from '@playwright/test';

/**
 * Public-site, read-only interaction checks. Never mark user progress,
 * send authentication requests, initiate payments or modify live data.
 */
test('global site search opens with keyboard and indexes TryHackMe rooms',async({page})=>{
  await page.goto('/labs',{waitUntil:'domcontentloaded'});
  await page.keyboard.press('Control+k');
  const dialog=page.getByRole('dialog',{name:'Search CyberTube'});
  await expect(dialog).toBeVisible();
  const field=dialog.getByRole('combobox',{name:'Search site pages, courses, labs and resources'});
  await field.fill('TryHackMe');
  await expect(dialog.getByRole('listbox',{name:'Site search results'})).toBeVisible();
  await expect(dialog.getByText(/TryHackMe Free Labs/i).first()).toBeVisible({timeout:15000});
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('Discover videos section is navigable and searchable without changing cloud state',async({page})=>{
  await page.goto('/discover',{waitUntil:'domcontentloaded'});
  const nav=page.getByRole('navigation',{name:'Discover content sections'});
  await expect(nav).toBeVisible();
  await nav.getByRole('button',{name:/Videos/i}).first().click();
  await expect(page).toHaveURL(/tab=videos/);
  const search=page.getByRole('search').first();
  await expect(search).toBeVisible();
  await search.locator('input').fill('linux');
  await search.getByRole('button',{name:'Search'}).click();
  await expect(page).toHaveURL(/tab=videos/);
});

test('TryHackMe room filters are usable for guest browsing',async({page})=>{
  await page.goto('/labs',{waitUntil:'domcontentloaded'});
  const field=page.getByPlaceholder('Search room title, topic, or room URL ID...');
  await expect(field).toBeVisible();
  await field.fill('linux');
  await expect(field).toHaveValue('linux');
  const filter=page.getByRole('group',{name:'Filter by suggested level'});
  await expect(filter).toBeVisible();
  await filter.getByRole('button',{name:'Beginner',exact:true}).click();
  await expect(filter.getByRole('button',{name:'Beginner',exact:true})).toHaveAttribute('aria-pressed','true');
});

test('mobile navigation opens and closes without page mutation',async({page})=>{
  await page.setViewportSize({width:375,height:812});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const menu=page.getByRole('button',{name:'Toggle mobile navigation menu'});
  await menu.click();
  await expect(page.getByText('Resources & Reference')).toBeVisible();
  await expect(page.getByRole('link',{name:'Practical Labs'})).toBeVisible();
  await menu.click();
  await expect(page.getByText('Resources & Reference')).toBeHidden();
});

test('global public search API serves a nonempty real Linux catalog',async({request})=>{
  const response=await request.get('/api/search?q=linux&pageSize=10');
  expect(response.status()).toBe(200);
  const data=await response.json();
  expect(data.query).toBe('linux');
  expect(data.total).toBeGreaterThan(0);
  expect(data.results.length).toBeGreaterThan(0);
});
