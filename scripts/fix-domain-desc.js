const fs = require('fs');

let search = fs.readFileSync('src/lib/search.ts', 'utf8');
search = search.replace('const descMatch = domain.description.toLowerCase().includes(cleanQuery);', 'const descMatch = domain.shortDescription.toLowerCase().includes(cleanQuery);');
search = search.replace('description: domain.description,', 'description: domain.shortDescription,');
fs.writeFileSync('src/lib/search.ts', search, 'utf8');

console.log('Fixed domain.shortDescription in search.ts');

