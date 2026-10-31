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

function generateQRScannerFallbackHtml() {
  const dataPath = path.join(rootDir, 'src', 'data', 'qrScannerLegalData.json');
  if (!fs.existsSync(dataPath)) return '';
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  let html = `<main style="max-width: 800px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #e2e8f0; background-color: #0b0f19;">`;
  html += `<header style="margin-bottom: 30px; border-bottom: 1px solid #1e293b; padding-bottom: 20px;">`;
  html += `<p style="font-size: 12px; color: #facc15; font-family: monospace; text-transform: uppercase;">Android Application Privacy Policy</p>`;
  html += `<h1 style="font-size: 32px; margin: 8px 0; color: #f8fafc;">${data.metadata.appName} — ${data.metadata.title}</h1>`;
  html += `<p style="font-size: 14px; color: #94a3b8;">${data.metadata.subtitle}</p>`;
  html += `<p style="font-size: 12px; color: #94a3b8; font-family: monospace;">Application ID: <strong style="color: #f8fafc;">${data.metadata.packageName}</strong> | Effective: ${data.metadata.effectiveDate} | Last Updated: ${data.metadata.lastUpdated}</p>`;
  html += `<p style="font-size: 12px; color: #94a3b8;">Privacy Contact: <a href="mailto:${data.metadata.contactEmail}" style="color: #facc15;">${data.metadata.contactEmail}</a></p>`;
  html += `</header>`;

  html += `<div style="background: #111827; border-left: 4px solid #facc15; padding: 12px 16px; margin-bottom: 30px; font-size: 13px; color: #cbd5e1;">`;
  html += `<strong>Notice:</strong> ${data.notice}`;
  html += `</div>`;

  for (const section of data.sections) {
    html += `<section style="margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid #1e293b;">`;
    html += `<h2 style="font-size: 20px; color: #f8fafc; margin-bottom: 12px;"><span style="color: #facc15; font-family: monospace;">${section.number}.</span> ${section.title}</h2>`;
    for (const p of section.paragraphs) {
      html += `<p style="font-size: 14px; color: #cbd5e1; margin-bottom: 10px;">${p}</p>`;
    }
    if (section.listItems && section.listItems.length > 0) {
      html += `<ul style="font-size: 14px; color: #cbd5e1; margin: 10px 0 10px 20px;">`;
      for (const item of section.listItems) {
        html += `<li style="margin-bottom: 6px;">${item}</li>`;
      }
      html += `</ul>`;
    }
    if (section.table) {
      html += `<div style="overflow-x: auto; margin-top: 14px;">`;
      html += `<table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">`;
      html += `<thead><tr style="border-bottom: 1px solid #334155; background: #1e293b;">`;
      for (const h of section.table.headers) {
        html += `<th style="padding: 8px 12px; color: #facc15;">${h}</th>`;
      }
      html += `</tr></thead><tbody>`;
      for (const row of section.table.rows) {
        html += `<tr style="border-bottom: 1px solid #1e293b;">`;
        for (let i = 0; i < row.length; i++) {
          const color =
            i === 1 && row[i].startsWith('NO')
              ? '#34d399'
              : i === 1 && (row[i].startsWith('YES') || row[i].startsWith('AUTOMATIC'))
              ? '#facc15'
              : '#cbd5e1';
          html += `<td style="padding: 8px 12px; color: ${color};">${row[i]}</td>`;
        }
        html += `</tr>`;
      }
      html += `</tbody></table></div>`;
    }
    html += `</section>`;
  }

  html += `<footer style="margin-top: 40px; padding: 20px; background: #111827; border-radius: 8px; font-size: 13px; color: #94a3b8;">`;
  html += `<p>Questions or requests? Contact <a href="mailto:${data.metadata.contactEmail}" style="color: #facc15;">${data.metadata.contactEmail}</a></p>`;
  html += `<p>© ${new Date().getFullYear()} ${data.metadata.operatorName} (${data.metadata.developerBrand}). All rights reserved.</p>`;
  html += `</footer>`;
  html += `</main>`;
  return html;
}

function createStaticRoute(routePath, title, description, canonicalUrl, fallbackHtml = null) {
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

  // Inject fallback HTML for non-JS / search engine / policy crawler reading
  if (fallbackHtml) {
    modifiedHtml = modifiedHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${fallbackHtml}</div>`
    );
  }

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

// 3. /qr-scanner/privacy-policy/
createStaticRoute(
  'qr-scanner/privacy-policy',
  'QR Scanner & Barcode Scanner – Privacy Policy | FuzailVerse',
  'Privacy Policy for FuzailVerse QR Scanner & Generator. Learn how camera access, scan history, Firebase Analytics and Crashlytics data are handled.',
  'https://fuzailverse.pages.dev/qr-scanner/privacy-policy/',
  generateQRScannerFallbackHtml()
);

console.log('Post-build static routes generated successfully.');
