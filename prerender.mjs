import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClient = path.resolve(__dirname, 'dist/client');
const distServer = path.resolve(__dirname, 'dist/server');

const { render, getAllUrls } = await import(
  path.resolve(distServer, 'entry-server.js')
);

const template = fs.readFileSync(
  path.resolve(distClient, 'index.html'),
  'utf-8',
);

const urls = getAllUrls();
let ok = 0;
let fail = 0;

for (const url of urls) {
  try {
    const { html, helmet } = render(url);

    let page = template;

    // Inject pre-rendered body
    page = page.replace(
      /<div id="app"([^>]*)><\/div>/,
      `<div id="app"$1>${html}</div>`,
    );

    // Replace default <title> with page-specific Helmet title
    if (helmet?.title) {
      page = page.replace(/<title>[^<]*<\/title>/, helmet.title.toString());
    }

    // Inject Helmet meta / link / script tags before </head>
    const headTags = [
      helmet?.meta?.toString(),
      helmet?.link?.toString(),
      helmet?.script?.toString(),
    ]
      .filter(Boolean)
      .join('\n');

    if (headTags) {
      page = page.replace('</head>', `${headTags}\n</head>`);
    }

    // Write to dist/client/{path}/index.html
    const filePath =
      url === '/'
        ? path.resolve(distClient, 'index.html')
        : path.resolve(distClient, url.slice(1), 'index.html');

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, page);
    ok++;
  } catch (err) {
    console.error(`FAIL ${url}: ${err.message}`);
    fail++;
  }
}

console.log(
  `Pre-rendered ${ok}/${urls.length} pages` +
    (fail ? ` (${fail} failed)` : ''),
);

if (fail > 0) process.exit(1);
