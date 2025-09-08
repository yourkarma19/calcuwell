#!/bin/bash

echo "🚀 Starting Pre-Deploy Checks for CalcPro 🚀"

# 1. Check Node & npm versions
echo "🔹 Node version: $(node -v)"
echo "🔹 npm version: $(npm -v)"

# 2. Clean caches
echo "🔹 Removing node_modules, package-lock.json, .next"
rm -rf node_modules package-lock.json .next

# 3. Install dependencies
echo "🔹 Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

# 4. Lint check
echo "🔹 Running ESLint..."
npm run lint -- --max-warnings=0 || { echo "❌ Lint errors found"; exit 1; }

# 5. TypeScript check
echo "🔹 Running TypeScript check..."
npx tsc --noEmit || { echo "❌ TypeScript errors found"; exit 1; }

# 6. Build locally
echo "🔹 Building Next.js project..."
npm run build || { echo "❌ Build failed"; exit 1; }

# 7. Start production server (quick check)
echo "🔹 Running local production server for quick check..."
npm run start &
SERVER_PID=$!
sleep 5
kill $SERVER_PID
echo "✅ Production server ran successfully (quick check)"

# 8. Netlify local build
echo "🔹 Running Netlify CLI build..."
if ! command -v netlify &> /dev/null
then
    echo "⚠ Netlify CLI not installed. Installing..."
    npm install -g netlify-cli
fi
netlify build || { echo "❌ Netlify build failed"; exit 1; }

echo "🎉 All pre-deploy checks passed! Ready for Netlify deployment."
