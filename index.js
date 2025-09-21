import express from 'express';
import fs from 'node:fs/promises';
import { createServer as createViteServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8081;
const base = process.env.BASE || '/';

console.log('Environment:', { isProduction, port, base });
console.log('Current working directory:', process.cwd());
console.log('Files in current directory:', await fs.readdir('.'));

let templateHtml, ssrManifest;

if (isProduction) {
  try {
    console.log('Looking for template at: ./dist/client/index.html');
    templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
    console.log('Template loaded successfully');
  } catch (error) {
    console.error('Error loading template:', error.message);
    console.log('Files in dist directory:', await fs.readdir('./dist').catch(() => 'dist directory does not exist'));
    console.log('Files in dist/client directory:', await fs.readdir('./dist/client').catch(() => 'dist/client directory does not exist'));
    throw error;
  }
  
  try {
    console.log('Looking for SSR manifest at: ./dist/client/.vite/ssr-manifest.json');
    ssrManifest = await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8');
    console.log('SSR manifest loaded successfully');
  } catch (error) {
    console.error('Error loading SSR manifest:', error.message);
    ssrManifest = undefined;
  }
} else {
  templateHtml = '';
  ssrManifest = undefined;
}

const app = express();

let vite;

if (!isProduction) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static('dist/client', {
    index: false
  }));
}

// Add middleware for proper routing
app.use((req, res, next) => {
  // Set proper headers for SSR
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.get('*', async(req, res) => {
  try {
    const url = req.originalUrl;

    let template, render;

    if (isProduction) {
      template = templateHtml;
      const serverEntry = await import('./dist/server/entry-server.js');
      render = serverEntry.render;
    } else {
      template = await fs.readFile('./src/index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const serverEntry = await vite.ssrLoadModule('/src/entry-server.jsx');
      render = serverEntry.render;
    }

    const { html: appHtml, helmet } = render(url);

    const html = template
      .replace(`<!--app-html-->`, appHtml)
      .replace('<!--helmet-title-->', helmet.title.toString())
      .replace('<!--helmet-meta-->', helmet.meta.toString());

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
