#!/bin/bash
echo "🧹 Cleaning up existing processes..."
taskkill /F /IM node.exe 2>/dev/null || true

echo "🚀 Starting SSR server..."
export NODE_ENV=production
export PORT=3001
node index.js
