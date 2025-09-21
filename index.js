import express from 'express';
import fs from 'node:fs/promises';
import { createServer as createViteServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8081;
const base = process.env.BASE || '/';

const templateHtml = isProduction ? 
  await fs.readFile('./dist/client/index.html', 'utf-8') : 
  '';

const ssrManifest = isProduction ? 
  await fs.readFile('./dist/client/ssr-manifest.json', 'utf-8') : 
  undefined;

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

app.use('*' , async(req, res) => {
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

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
