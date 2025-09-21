@echo off
echo 🧹 Cleaning up existing processes...
taskkill /F /IM node.exe 2>nul

echo 🚀 Starting SSR server...
set NODE_ENV=production
set PORT=3001
node index.js
