#!/bin/bash
# 🚀 Automated Deploy Debug Script
# Run with: bash check-deploy.sh

echo "===================================="
echo " 🧹 Step 1: Cleaning old files..."
echo "===================================="
rm -rf node_modules package-lock.json dist .next

echo "===================================="
echo " 📦 Step 2: Installing dependencies..."
echo "===================================="
npm install

echo "===================================="
echo " 🔍 Step 3: Running TypeScript check..."
echo "===================================="
if npm run type-check; then
  echo "✅ TypeScript check passed"
else
  echo "❌ TypeScript errors found!"
fi

echo "===================================="
echo " 🧑‍💻 Step 4: Running ESLint check..."
echo "===================================="
if npm run lint; then
  echo "✅ Lint check passed"
else
  echo "❌ Lint errors found!"
fi

echo "===================================="
echo " 🏗️ Step 5: Running local build..."
echo "===================================="
if npm run build; then
  echo "✅ Local build passed"
else
  echo "❌ Local build failed!"
fi

echo "===================================="
echo " 🌍 Step 6: Simulating Netlify build..."
echo "===================================="
if command -v netlify >/dev/null 2>&1; then
  if netlify build; then
    echo "✅ Netlify build passed"
  else
    echo "❌ Netlify build failed!"
  fi
else
  echo "⚠️ Netlify CLI not installed. Run: npm install -g netlify-cli"
fi

echo "===================================="
echo " ✅ Debugging finished!"
echo " Check above logs for exact errors."
echo "===================================="
