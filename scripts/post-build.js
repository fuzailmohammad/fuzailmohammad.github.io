import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

function createStaticRoute(routePath, title, description, canonicalUrl) {
  const targetDir = path.join(distDir, routePath);
  fs.mkdirSync(targetDir, { recursive: true });

  let modifiedHtml = baseHtml;

  // Replace Title
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${title}</title>`
  );

  // Replace or inject Description
  if (/<meta\s+name="description"\s+content=".*?"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    );
  }

  // Replace or inject OG Title
  if (/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${title}" />`
    );
  }

  // Replace or inject OG Description
  if (/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`
    );
  }

  // Replace or inject OG URL
  if (/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
  }

  // Inject Canonical Link
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  modifiedHtml = modifiedHtml.replace('</head>', `  ${canonicalTag}\n  </head>`);

  const destPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(destPath, modifiedHtml, 'utf-8');
  console.log(`Created static route: ${destPath}`);
}

// 1. /privacy-policy/
createStaticRoute(
  'privacy-policy',
  'Privacy Policy | FuzailVerse',
  'General Privacy Policy for FuzailVerse apps and digital services.',
  'https://fuzailverse.pages.dev/privacy-policy/'
);

// 2. /terms-and-conditions/
createStaticRoute(
  'terms-and-conditions',
  'Terms & Conditions | FuzailVerse',
  'General Terms & Conditions for FuzailVerse apps and digital services.',
  'https://fuzailverse.pages.dev/terms-and-conditions/'
);

console.log('Post-build static routes generated successfully.');

