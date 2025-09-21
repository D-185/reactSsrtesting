import express from 'express';
import fs from 'node:fs/promises';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8081;

console.log('Environment:', { isProduction, port });

let templateHtml, ssrManifest;

if (isProduction) {
  try {
    templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
    ssrManifest = await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8');
    console.log('Production files loaded successfully');
  } catch (error) {
    console.error('Error loading production files:', error.message);
    throw error;
  }
}

const app = express();

// Add compression middleware
app.use(compression());

let vite;

if (!isProduction) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
} else {
  // Serve static files
  app.use('/assets', express.static('dist/client/assets'));
}

// Define routes like Next.js
const routes = {
  '/': 'Dashboard',
  '/profile': 'Profile', 
  '/settings': 'Settings'
};

// Single route handler for all routes
app.get('*', async (req, res) => {
  try {
    const url = req.originalUrl;
    const pageName = routes[url] || 'Dashboard';

    let template, render;

    if (isProduction) {
      // Use source template for SSR placeholders
      template = await fs.readFile('./src/index.html', 'utf-8');
      const serverEntry = await import('./dist/server/entry-server.js');
      render = serverEntry.render;
    } else {
      template = await fs.readFile('./src/index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const serverEntry = await vite.ssrLoadModule('/src/entry-server.jsx');
      render = serverEntry.render;
    }

    const { html: appHtml, helmet } = render(url, { pageName });

    // Get the correct script path from the built manifest
    let scriptPath = '/src/entry-client.jsx';
    if (isProduction) {
      try {
        const manifest = JSON.parse(ssrManifest);
        scriptPath = manifest['src/entry-client.jsx'] || '/assets/index-Pgl2f8E7.js';
      } catch (e) {
        scriptPath = '/assets/index-Pgl2f8E7.js';
      }
    }

    const html = template
      .replace(`<!--app-html-->`, appHtml)
      .replace('<!--helmet-title-->', helmet.title.toString())
      .replace('<!--helmet-meta-->', helmet.meta.toString())
      .replace('/src/entry-client.jsx', scriptPath);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
