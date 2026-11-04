const fs = require('fs');

// 1. Update app/auth/callback/route.ts
const callbackPath = 'app/auth/callback/route.ts';
let callback = fs.readFileSync(callbackPath, 'utf8');
callback = callback.replace("return new URL('/account', baseUrl);", "return new URL('/', baseUrl);");
fs.writeFileSync(callbackPath, callback, 'utf8');
console.log('Updated app/auth/callback/route.ts default redirect to /');

// 2. Update app/login/page.tsx
const loginPath = 'app/login/page.tsx';
let login = fs.readFileSync(loginPath, 'utf8');
login = login.replace(
  "const rawRedirect = searchParams.get('redirect') || searchParams.get('next') || '/account';",
  "const rawRedirect = searchParams.get('redirect') || searchParams.get('next') || '/';"
);
login = login.replace(": '/account';", ": '/';");
fs.writeFileSync(loginPath, login, 'utf8');
console.log('Updated app/login/page.tsx default redirect to /');

// 3. Update app/register/page.tsx
const regPath = 'app/register/page.tsx';
let register = fs.readFileSync(regPath, 'utf8');
register = register.replace('redirectPath="/account"', 'redirectPath="/"');
fs.writeFileSync(regPath, register, 'utf8');
console.log('Updated app/register/page.tsx default redirect to /');

// 4. Update app/actions/auth.ts
const actionsPath = 'app/actions/auth.ts';
let actions = fs.readFileSync(actionsPath, 'utf8');
actions = actions.replace(
  "const redirectPath = (formData.get('redirect') as string) || '/account';",
  "const redirectPath = (formData.get('redirect') as string) || '/';"
);
fs.writeFileSync(actionsPath, actions, 'utf8');
console.log('Updated app/actions/auth.ts default redirect to /');

