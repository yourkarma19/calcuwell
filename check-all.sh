#!/bin/bash
# 🔎 Automated Full Project Check Script
# Run with: bash check-all.sh

echo "🚀 Cleaning old build files..."
rm -rf node_modules package-lock.json .next

echo "📦 Installing fresh dependencies..."
npm install

echo "✅ Running TypeScript check..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found!"
  exit 1
fi

echo "🔍 Running ESLint (with auto-fix)..."
npx eslint . --ext .ts,.tsx --fix
if [ $? -ne 0 ]; then
  echo "❌ ESLint errors remain!"
  exit 1
fi

echo "🧪 Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed!"
  exit 1
fi

echo "🏗️ Running build (to simulate deploy)..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "🎉 All checks passed successfully! Ready to deploy 🚀"
